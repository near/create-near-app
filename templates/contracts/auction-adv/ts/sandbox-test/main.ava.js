

import anyTest from 'ava';
import { NEAR, Worker } from 'near-workspaces';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17


/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;
const FT_WASM_FILEPATH = "./sandbox-test/fungible_token.wasm";
const NFT_WASM_FILEPATH = "./sandbox-test/non_fungible_token.wasm";
test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = t.context.worker = await Worker.init();

  // Create accounts
  const root = worker.rootAccount;

  const alice = await root.createSubAccount("alice",{initialBalance: NEAR.parse("10 N").toString()});
  const bob = await root.createSubAccount("bob",{initialBalance: NEAR.parse("10 N").toString()});
  const contract = await root.createSubAccount("contract",{initialBalance: NEAR.parse("10 N").toString()});
  const auctioneer = await root.createSubAccount("auctioneer",{initialBalance: NEAR.parse("10 N").toString()});

  // Deploy and initialize FT contract
  const ft_contract = await root.devDeploy(FT_WASM_FILEPATH);
  await ft_contract.call(ft_contract,"new_default_meta",{"owner_id":ft_contract.accountId,"total_supply":BigInt(1_000_000).toString()});

  // Deploy and initialize NFT contract 
  const nft_contract = await root.devDeploy(NFT_WASM_FILEPATH);
  await nft_contract.call(nft_contract, "new_default_meta", { "owner_id": nft_contract.accountId });

  // Mint NFT
  const token_id = "1";
  let request_payload = {
    "token_id": token_id,
    "receiver_id": contract.accountId,
    "metadata": {
        "title": "LEEROYYYMMMJENKINSSS",
        "description": "Alright time's up, let's do this.",
        "media": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1"
    },
  };

  await nft_contract.call(nft_contract,"nft_mint",request_payload,{ attachedDeposit: NEAR.from("8000000000000000000000").toString(),gas: "300000000000000" });

  // Register accounts in FT contract
  const contracts = [alice,bob,contract,auctioneer];
  for (const contract_to_register of contracts) {
    await contract_to_register.call(ft_contract, "storage_deposit",{ "account_id": contract_to_register.accountId },{ attachedDeposit: NEAR.from("8000000000000000000000").toString(),gas: "300000000000000" })
  }

  // Give accounts FTs
  await ft_contract.call(ft_contract,"ft_transfer",{"receiver_id":alice.accountId,"amount":BigInt(150_000).toString()},{ attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  await ft_contract.call(ft_contract,"ft_transfer",{"receiver_id":bob.accountId,"amount":BigInt(150_000).toString()},{ attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });

  // Deploy contract (input from package.json)
  await contract.deploy(process.argv[2]);

  // Initialize contract, finishes in 1 minute
  await contract.call(contract, "init", {
    end_time: String((Date.now() + 60000) * 10 ** 6),
    auctioneer: auctioneer.accountId,
    ft_contract: ft_contract.accountId,
    nft_contract: nft_contract.accountId,
    token_id: token_id,
    starting_price: BigInt(10_000).toString()
  });

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { alice, bob, contract, auctioneer,ft_contract,nft_contract};
});


test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});


test("Test full contract", async (t) => {
  const { alice, bob, auctioneer, contract, nft_contract, ft_contract } = t.context.accounts;

  // Alice makes bid less than starting price
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(5_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  let highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, contract.accountId);
  t.is(highest_bid.bid, BigInt(10_000).toString());

  let contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(0).toString());
  let alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(150_000).toString());

  // Alice makes valid bid
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(50_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, alice.accountId);
  t.is(highest_bid.bid, BigInt(50_000).toString());

  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(50_000).toString());
  alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(100_000).toString());

  // Bob makes a higher bid
  await bob.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(60_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  // Check Alice recieved her bid back
  const aliceNewBalance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId});
  t.is(BigInt(150_000).toString(),aliceNewBalance);

  // Alice tries to make a bid with less FTs than the previous
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(50_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(60_000).toString());
  alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(150_000).toString());

  // Auctioneer claims auction but did not finish
  await t.throwsAsync(auctioneer.call(contract, "claim",{},{ gas: "300000000000000" }))

  // Fast forward 200 blocks
  await t.context.worker.provider.fastForward(200)

  // Auctioneer claims auction
  await auctioneer.call(contract, "claim",{},{ gas: "300000000000000" });

  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(0).toString());
  const auctioneer_balance = await ft_contract.view("ft_balance_of",{"account_id": auctioneer.accountId});
  t.is(auctioneer_balance, BigInt(60_000).toString());

  // Check highest bidder received the NFT
  const response = await nft_contract.call(nft_contract, "nft_token",{"token_id": "1"},{ gas: "300000000000000" });
  t.is(response.owner_id,bob.accountId);

  // Auctioneer claims auction back but fails
  await t.throwsAsync(auctioneer.call(contract, "claim",{},{ gas: "300000000000000" }))

  // Alice tries to make a bid when the auction is over
  await alice.call(ft_contract, "ft_transfer_call", { "receiver_id": contract.accountId,"amount": BigInt(70_000).toString(),"msg":""}, { attachedDeposit: NEAR.from("1").toString(),gas: "300000000000000" });
  highest_bid = await contract.view("get_highest_bid", {});
  t.is(highest_bid.bidder, bob.accountId);
  t.is(highest_bid.bid, BigInt(60_000).toString());

  contract_balance = await ft_contract.view("ft_balance_of",{"account_id": contract.accountId})
  t.is(contract_balance, BigInt(0).toString());
  alice_balance = await ft_contract.view("ft_balance_of",{"account_id": alice.accountId})
  t.is(alice_balance, BigInt(150_000).toString());
  let bob_balance = await ft_contract.view("ft_balance_of",{"account_id": bob.accountId})
  t.is(bob_balance, BigInt(90_000).toString());
});
