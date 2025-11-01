import anyTest from 'ava';
import { Worker, NEAR } from 'near-workspaces';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async (t) => {
  // Create sandbox, accounts, deploy contracts, etc.
  const worker = t.context.worker = await Worker.init();

  // deploy contract
  const root = worker.rootAccount;

  // some test accounts
  const alice = await root.createSubAccount("alice", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });
  const contract = await root.createSubAccount("contract", {
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract, alice };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test("send one message and retrieve it", async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, "add_message", { text: "aloha" });
  const msgs = await contract.view("get_messages");
  const expectedMessagesResult = [
    { premium: false, sender: root.accountId, text: "aloha" },
  ];
  t.deepEqual(msgs, expectedMessagesResult);
});

test("send two messages and expect two total", async (t) => {
  const { root, contract, alice } = t.context.accounts;
  await root.call(contract, "add_message", { text: "aloha" });
  await alice.call(contract, "add_message", { text: "hola" }, { attachedDeposit: NEAR.parse('1') });

  const total_messages = await contract.view("total_messages");
  t.is(total_messages, 2);

  const msgs = await contract.view("get_messages");
  const expected = [
    { premium: false, sender: root.accountId, text: "aloha" },
    { premium: true, sender: alice.accountId, text: "hola" },
  ];

  t.deepEqual(msgs, expected);
});
