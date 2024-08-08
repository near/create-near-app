# Quick Start: Create, Build, and Deploy a NEAR Smart Contract in TypeScript

## Prerequisites

1. **Node.js( >= 16) and npm**: Ensure they are installed.
2. **NEAR CLI**: Install globally:

   ```
   npm install -g near-cli
   ```
3. **NEAR Testnet Account**: Create one if you haven't already.

## 1: Set Up Your Project
```
npx create-near-app
```
## 2: Write Your Smart Contract
Create the contract in `/src`
```ts
import { NearBindgen, near, call, view } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {
  greeting: string = "Hello";

  @view // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): 
  void {
    // Record a log permanently to the blockchain!
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}
```

## 3: Build the Contract
```
npx near-sdk-js build <path_to_contract>
```

## 4: Deploy the Contract

#### Create and Account and Deploy
```sh
# Create a new account pre-funded by a faucet & deploy
near create-account <accountId> --useFaucet
near deploy <accountId> <route_to_wasm>

# Get the account name
cat ./neardev/dev-account
```

#### Deploy in an Existing Account

```sh
# login into your account
near login

# deploy the contract
near deploy <accountId> <route_to_wasm>
```

## 5. Retrieve the Greeting

`get_greeting` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the greeting
near view <your-account.testnet> get_greeting
```

<br />

## 6. Store a New Greeting
`set_greeting` changes the contract's state, for which it is a `call` method.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to set a new greeting
near call <your-account.testnet> set_greeting '{"greeting":"howdy"}' --accountId <your-account.testnet>
```

**Tip:** If you would like to call `set_greeting` using another account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <another-account>`.

[Smart Contracts quickstart docs](https://docs.near.org/build/smart-contracts/quickstart)