# Guest Book Contract

The smart contract stores messages from users. Messages can be `premium` if the user attaches sufficient money (0.1 $NEAR).

```ts
this.messages = [];

@call
// Public - Adds a new message.
add_message({ text }: { text: string }) {
  // If the user attaches more than 0.1N the message is premium
  const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
  const sender = near.predecessorAccountId();

  const message = new PostedMessage({premium, sender, text});
  this.messages.push(message);
}
  
@view
// Returns an array of messages.
get_messages({ fromIndex = 0, limit = 10 }: { fromIndex: number, limit: number }): PostedMessage[] {
  return this.messages.slice(fromIndex, fromIndex + limit);
}
```

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Test the Contract
You can automatically compile and test the contract by running:

```bash
npm run test
```

<br />

## 2. Create an Account and Deploy
You can create a testnet account and deploy the contract by running:

```bash
near create-account <your-account.testnet> --useFaucet
near deploy <your-account.testnet> build/release/hello_near.wasm
```

## 3. Retrieve the Stored Messages
`get_messages` is a read-only method (`view` method) that returns a slice of the vector `messages`.

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
near view <your-account.testnet> get_messages '{"from_index":0, "limit":10}'
```

<br />

## 4. Add a Message
`add_message` adds a message to the vector of `messages` and marks it as premium if the user attached more than `0.1 NEAR`.

`add_message` is a payable method for which can only be invoked using a NEAR account. The account needs to attach money and pay GAS for the transaction.

```bash
# Use near-cli to donate 1 NEAR
near call <your-account.testnet> add_message '{"text": "a message"}' --amount 0.1 --accountId <your-account.testnet>
```

**Tip:** If you would like to add a message another account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account.testnet>`.
