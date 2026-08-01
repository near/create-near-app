import anyTest from 'ava';
import { readFileSync } from 'fs';
import { Sandbox, DEFAULT_ACCOUNT_ID, DEFAULT_PRIVATE_KEY } from 'near-sandbox';
import { Account, JsonRpcProvider, KeyPair, KeyPairSigner, nearToYocto } from 'near-api-js';

/**
 *  @type {import('ava').TestFn<{sandbox: import('near-sandbox').Sandbox, provider: JsonRpcProvider, alice: Account, bob: Account, auctioneer: Account, contract: Account, ft_contract: Account, nft_contract: Account}>}
 */
const test = anyTest;

const FT_WASM_FILEPATH = './sandbox-test/fungible_token.wasm';
const NFT_WASM_FILEPATH = './sandbox-test/non_fungible_token.wasm';

const STORAGE_DEPOSIT = '8000000000000000000000'; // 0.008 NEAR
const ONE_YOCTO = '1';
const GAS_300_TGAS = '300000000000000';

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
  const names = ['alice', 'bob', 'auctioneer', 'contract', 'ft', 'nft'];
  for (const name of names) {
    await root.createSubAccount({
      accountOrPrefix: name,
      publicKey: keyPair.getPublicKey(),
      nearToTransfer: nearToYocto('10'),
    });
  }

  const [alice, bob, auctioneer, contract, ft_contract, nft_contract] = names.map(
    (name) => new Account(`${name}.${DEFAULT_ACCOUNT_ID}`, provider, signer),
  );

  // Deploy and initialize FT contract
  await ft_contract.deployContract(readFileSync(FT_WASM_FILEPATH));
  await ft_contract.callFunction({
    contractId: ft_contract.accountId,
    methodName: 'new_default_meta',
    args: { owner_id: ft_contract.accountId, total_supply: BigInt(1_000_000).toString() },
  });

  // Deploy and initialize NFT contract
  await nft_contract.deployContract(readFileSync(NFT_WASM_FILEPATH));
  await nft_contract.callFunction({
    contractId: nft_contract.accountId,
    methodName: 'new_default_meta',
    args: { owner_id: nft_contract.accountId },
  });

  // Mint NFT
  const token_id = '1';
  await nft_contract.callFunction({
    contractId: nft_contract.accountId,
    methodName: 'nft_mint',
    args: {
      token_id: token_id,
      receiver_id: contract.accountId,
      token_metadata: {
        title: 'LEEROYYYMMMJENKINSSS',
        description: "Alright time's up, let's do this.",
        media: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1',
      },
    },
    deposit: nearToYocto('0.08'),
    gas: GAS_300_TGAS,
  });

  // Register accounts in FT contract
  for (const account of [alice, bob, contract, auctioneer]) {
    await account.callFunction({
      contractId: ft_contract.accountId,
      methodName: 'storage_deposit',
      args: { account_id: account.accountId },
      deposit: STORAGE_DEPOSIT,
      gas: GAS_300_TGAS,
    });
  }

  // Give accounts FTs
  for (const account of [alice, bob]) {
    await ft_contract.callFunction({
      contractId: ft_contract.accountId,
      methodName: 'ft_transfer',
      args: { receiver_id: account.accountId, amount: BigInt(150_000).toString() },
      deposit: ONE_YOCTO,
      gas: GAS_300_TGAS,
    });
  }

  // Deploy the auction contract (input from package.json)
  await contract.deployContract(readFileSync(process.argv[2]));

  // Initialize contract, finishes in 1 minute
  await contract.callFunction({
    contractId: contract.accountId,
    methodName: 'init',
    args: {
      end_time: String((Date.now() + 60000) * 10 ** 6),
      auctioneer: auctioneer.accountId,
      ft_contract: ft_contract.accountId,
      nft_contract: nft_contract.accountId,
      token_id: token_id,
      starting_price: BigInt(10_000).toString(),
    },
  });

  // Save state for test runs, it is unique for each test
  t.context = { sandbox, provider, alice, bob, auctioneer, contract, ft_contract, nft_contract };
});

test.afterEach.always(async (t) => {
  // Stop the sandbox and clean up temporary files
  await t.context.sandbox.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('Test full contract', async (t) => {
  const { provider, alice, bob, auctioneer, contract, ft_contract, nft_contract } = t.context;

  const ftBid = (bidder, amount) =>
    bidder.callFunction({
      contractId: ft_contract.accountId,
      methodName: 'ft_transfer_call',
      args: { receiver_id: contract.accountId, amount: BigInt(amount).toString(), msg: '' },
      deposit: ONE_YOCTO,
      gas: GAS_300_TGAS,
    });

  const getHighestBid = () =>
    provider.callFunction({
      contractId: contract.accountId,
      method: 'get_highest_bid',
      args: {},
    });

  const ftBalanceOf = (account) =>
    provider.callFunction({
      contractId: ft_contract.accountId,
      method: 'ft_balance_of',
      args: { account_id: account.accountId },
    });

  // Alice makes bid less than starting price
  await ftBid(alice, 5_000);
  let highest_bid = await getHighestBid();
  t.is(highest_bid.bidder, contract.accountId);
  t.is(highest_bid.bid, BigInt(10_000).toString());

  t.is(await ftBalanceOf(contract), BigInt(0).toString());
  t.is(await ftBalanceOf(alice), BigInt(150_000).toString());

  // Alice makes valid bid
  await ftBid(alice, 50_000);
  highest_bid = await getHighestBid();
  t.is(highest_bid.bidder, alice.accountId);
  t.is(highest_bid.bid, BigInt(50_000).toString());

  t.is(await ftBalanceOf(contract), BigInt(50_000).toString());
  t.is(await ftBalanceOf(alice), BigInt(100_000).toString());

  // Bob makes a higher bid
  await ftBid(bob, 60_000);
  highest_bid = await getHighestBid();
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  // Check Alice received her bid back
  t.is(await ftBalanceOf(alice), BigInt(150_000).toString());

  // Alice tries to make a bid with less FTs than the previous
  await ftBid(alice, 50_000);
  highest_bid = await getHighestBid();
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  t.is(await ftBalanceOf(contract), BigInt(60_000).toString());
  t.is(await ftBalanceOf(alice), BigInt(150_000).toString());

  // Auctioneer claims auction but did not finish
  await t.throwsAsync(
    auctioneer.callFunction({
      contractId: contract.accountId,
      methodName: 'claim',
      args: {},
      gas: GAS_300_TGAS,
    }),
  );

  // Fast forward 200 blocks so the auction is over
  await fastForward(provider, 200);

  // Auctioneer claims auction
  await auctioneer.callFunction({
    contractId: contract.accountId,
    methodName: 'claim',
    args: {},
    gas: GAS_300_TGAS,
  });

  t.is(await ftBalanceOf(contract), BigInt(0).toString());
  t.is(await ftBalanceOf(auctioneer), BigInt(60_000).toString());

  // Check highest bidder received the NFT
  const token = await provider.callFunction({
    contractId: nft_contract.accountId,
    method: 'nft_token',
    args: { token_id: '1' },
  });
  t.is(token.owner_id, bob.accountId);

  // Auctioneer tries to claim the auction again but fails
  await t.throwsAsync(
    auctioneer.callFunction({
      contractId: contract.accountId,
      methodName: 'claim',
      args: {},
      gas: GAS_300_TGAS,
    }),
  );

  // Alice tries to make a bid when the auction is over, the FTs are returned
  await ftBid(alice, 70_000);
  highest_bid = await getHighestBid();
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  t.is(await ftBalanceOf(contract), BigInt(0).toString());
  t.is(await ftBalanceOf(alice), BigInt(150_000).toString());
  t.is(await ftBalanceOf(bob), BigInt(90_000).toString());
});
