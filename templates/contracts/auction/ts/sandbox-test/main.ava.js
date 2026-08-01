import anyTest from 'ava';
import { readFileSync } from 'fs';
import { Sandbox, DEFAULT_ACCOUNT_ID, DEFAULT_PRIVATE_KEY } from 'near-sandbox';
import { Account, JsonRpcProvider, KeyPair, KeyPairSigner, nearToYocto } from 'near-api-js';

/**
 *  @type {import('ava').TestFn<{sandbox: import('near-sandbox').Sandbox, provider: JsonRpcProvider, alice: Account, bob: Account, auctioneer: Account, contract: Account}>}
 */
const test = anyTest;

// Advance the sandbox chain by `deltaHeight` blocks (sandbox-only RPC method)
async function fastForward(provider, deltaHeight) {
  await provider.sendJsonRpc('sandbox_fast_forward', { delta_height: deltaHeight });
}

test.beforeEach(async (t) => {
  // Start a fresh sandbox for each test
  const sandbox = await Sandbox.start({});
  const provider = new JsonRpcProvider({ url: sandbox.rpcUrl });

  // All accounts share the sandbox genesis key for simplicity
  const keyPair = KeyPair.fromString(DEFAULT_PRIVATE_KEY);
  const signer = new KeyPairSigner(keyPair);

  const root = new Account(DEFAULT_ACCOUNT_ID, provider, signer);

  // Create test accounts
  const names = ['alice', 'bob', 'auctioneer', 'contract'];
  for (const name of names) {
    await root.createSubAccount({
      accountOrPrefix: name,
      publicKey: keyPair.getPublicKey(),
      nearToTransfer: nearToYocto('10'),
    });
  }

  const [alice, bob, auctioneer, contract] = names.map(
    (name) => new Account(`${name}.${DEFAULT_ACCOUNT_ID}`, provider, signer),
  );

  // Deploy the wasm file passed by the package.json test script
  await contract.deployContract(readFileSync(process.argv[2]));

  // Initialize contract, finishes in 1 minute
  await contract.callFunction({
    contractId: contract.accountId,
    methodName: 'init',
    args: {
      end_time: String((Date.now() + 60000) * 10 ** 6),
      auctioneer: auctioneer.accountId,
    },
  });

  // Save state for test runs, it is unique for each test
  t.context = { sandbox, provider, alice, bob, auctioneer, contract };
});

test.afterEach.always(async (t) => {
  // Stop the sandbox and clean up temporary files
  await t.context.sandbox.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('Test full contract', async (t) => {
  const { provider, alice, bob, auctioneer, contract } = t.context;

  // Alice makes first bid
  await alice.callFunction({
    contractId: contract.accountId,
    methodName: 'bid',
    args: {},
    deposit: nearToYocto('1'),
  });
  let highest_bid = await provider.callFunction({
    contractId: contract.accountId,
    method: 'get_highest_bid',
    args: {},
  });
  t.is(highest_bid.bidder, alice.accountId);
  t.is(highest_bid.bid, nearToYocto('1').toString());
  const aliceBalance = await alice.getBalance();

  // Bob makes a higher bid
  await bob.callFunction({
    contractId: contract.accountId,
    methodName: 'bid',
    args: {},
    deposit: nearToYocto('2'),
  });
  highest_bid = await provider.callFunction({
    contractId: contract.accountId,
    method: 'get_highest_bid',
    args: {},
  });
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, nearToYocto('2').toString());

  // Check that alice was returned her bid (plus the gas refund from her bid tx)
  const aliceNewBalance = await alice.getBalance();
  const returned = aliceNewBalance - aliceBalance;
  t.true(returned >= nearToYocto('1') && returned < nearToYocto('1.001'));

  // Alice tries to make a bid with less NEAR than the previous
  await t.throwsAsync(
    alice.callFunction({
      contractId: contract.accountId,
      methodName: 'bid',
      args: {},
      deposit: nearToYocto('1'),
    }),
  );

  // Auctioneer claims auction but did not finish
  await t.throwsAsync(
    auctioneer.callFunction({
      contractId: contract.accountId,
      methodName: 'claim',
      args: {},
      gas: '300000000000000',
    }),
  );

  // Fast forward 200 blocks so the auction is over
  await fastForward(provider, 200);

  const auctioneerBalance = await auctioneer.getBalance();

  // Auctioneer claims the auction
  await auctioneer.callFunction({
    contractId: contract.accountId,
    methodName: 'claim',
    args: {},
    gas: '300000000000000',
  });

  // Checks that the auctioneer received the highest bid (minus a small amount of gas)
  const auctioneerNewBalance = await auctioneer.getBalance();
  const received = auctioneerNewBalance - auctioneerBalance;
  t.true(received > nearToYocto('1.99') && received <= nearToYocto('2'));

  // Auctioneer tries to claim the auction again
  await t.throwsAsync(
    auctioneer.callFunction({
      contractId: contract.accountId,
      methodName: 'claim',
      args: {},
      gas: '300000000000000',
    }),
  );

  // Alice tries to make a bid when the auction is over
  await t.throwsAsync(
    alice.callFunction({
      contractId: contract.accountId,
      methodName: 'bid',
      args: {},
      deposit: nearToYocto('1'),
    }),
  );
});
