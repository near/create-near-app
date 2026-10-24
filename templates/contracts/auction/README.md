# Basic Auction Contract 

This directory contains a Rust contract that is used as part of the [Basic Auction Tutorial](https://docs.near.org/tutorials/auction/basic-auction).

The contract is a simple auction where you can place bids, view the highest bid, and claim the tokens at the end of the auction.

This repo showcases the basic anatomy of a contract including how to store data in a contract, how to update the state, and then how to view it. It also looks at how to use environment variables and macros. We have also written sandbox test the contract locally.

---

## Build and test

The pinned Rust toolchain is installed by rustup. Install [cargo-near](https://github.com/near/cargo-near):

```bash
cargo install cargo-near --version 0.21.1 --locked
cargo near build non-reproducible-wasm
cargo test --locked
```

The integration test builds the contract, starts `near-sandbox`, creates local accounts, and uses `near-api` to submit transactions and read state. It tests bids, refunds, early claims, settlement, repeated claims, and bids after expiry. Time advances with the sandbox; no testnet credentials are used.

## Deploy

Use the current [NEAR CLI](https://near.cli.rs) to create an account with `near account create-account`.
Deploy and initialize in the same transaction to prevent anyone else from initializing the auction.
From this directory, run the interactive deployment command:

```bash
near contract deploy <contract.testnet> use-file target/near/auction_contract.wasm with-init-call init json-args '{"end_time":"<nanosecond timestamp>","auctioneer":"<auctioneer.testnet>"}'
```

Replace placeholders, including `end_time`, with real values. Compute a deadline two minutes from now with `node -e 'console.log((BigInt(Date.now() + 120000) * 1000000n).toString())'`.
Choose zero attached deposit for initialization, the testnet network, and the contract account as signer when prompted. U64 timestamps and U128 token amounts are JSON strings.
