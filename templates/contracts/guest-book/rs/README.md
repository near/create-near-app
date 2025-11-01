# Guest Book Contract

This smart contract stores messages from users. If the user attaches more than 0.1 NEAR tokens the message is marked as premium.

## How to Build Locally?

Install [`cargo-near`](https://github.com/near/cargo-near) and run:

```bash
cargo near build
```

## How to Test Locally?

```bash
cargo test
```

## How to Deploy?

To deploy manually, install [`cargo-near`](https://github.com/near/cargo-near) and run:

```bash
# Create a new account
cargo near create-dev-account

# Deploy the contract on it
cargo near deploy <account-id>
```


## How to Interact?

_In this example we will be using [NEAR CLI](https://github.com/near/near-cli)
to intract with the NEAR blockchain and the smart contract_

_If you want full control over of your interactions we recommend using the
[near-cli-rs](https://near.cli.rs)._


## 1. Add a Message
`add_message` adds a message to the vector of `messages` and marks it as premium if the user attached more than `0.1 NEAR`.

```rust
// Public - Adds a new message.
#[payable]
pub fn add_message(&mut self, text: String) {
  // If the user attaches more than 0.01N the message is premium
  let premium = env::attached_deposit() >= POINT_ONE;
  let sender = env::predecessor_account_id();

  let message = PostedMessage{premium, sender, text};
  self.messages.push(&message);
}
```

```bash
near call <dev-account> add_message '{"text": "a message"}' --amount 0.1 --accountId <account>
```

### 2. Retrieve the Stored Messages
`get_messages` is a read-only method (`view` method) that returns a slice of the vector `messages`.
Please note that `from_index` and `limit` are optional parameters.

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```rust
    // Public Method - Returns a slice of the messages.
    pub fn get_messages(&self, from_index: Option<U64>, limit: Option<U64>) -> Vec<&PostedMessage> {
        let from = u64::from(from_index.unwrap_or(U64(0)));
        let limit = u64::from(limit.unwrap_or(U64(10)));

        self.messages
            .iter()
            .skip(from as usize)
            .take(limit as usize)
            .collect()
    }
```

```bash
near view <dev-account> get_messages '{"from_index":0, "limit":10}'
```

## Useful Links

- [cargo-near](https://github.com/near/cargo-near) - NEAR smart contract development toolkit for Rust
- [near CLI-rs](https://near.cli.rs) - Iteract with NEAR blockchain from command line
- [NEAR Rust SDK Documentation](https://docs.near.org/sdk/rust/introduction)
- [NEAR Documentation](https://docs.near.org)
- [NEAR StackOverflow](https://stackoverflow.com/questions/tagged/nearprotocol)
- [NEAR Discord](https://near.chat)
- [NEAR Telegram Developers Community Group](https://t.me/neardev)
- NEAR DevHub: [Telegram](https://t.me/neardevhub), [Twitter](https://twitter.com/neardevhub)
