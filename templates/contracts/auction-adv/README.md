# Auction contract with FTs

This directory contains a Rust contract that is used as part of the [Bidding with FTs](https://docs.near.org/tutorials/auction/bidding-with-fts) section of the auction tutorial.

In this part the contract is adapted so users can bid in fungible tokens (FTs) instead of NEAR tokens. It is a great way to learn how to work with FTs in NEAR.

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
near contract deploy <contract.testnet> use-file target/near/auction_contract.wasm with-init-call init json-args '{"end_time":"<nanosecond timestamp>","auctioneer":"<auctioneer.testnet>","ft_contract":"<ft.testnet>","nft_contract":"<nft.testnet>","token_id":"1","starting_price":"10000"}'
```

Replace placeholders, including `end_time`, with real values. Compute a deadline two minutes from now with `node -e 'console.log((BigInt(Date.now() + 120000) * 1000000n).toString())'`.
Choose zero attached deposit for initialization, the testnet network, and the contract account as signer when prompted. U64 timestamps and U128 token amounts are JSON strings.

Transfer the NFT into the auction account before accepting bids. Register the auction, bidders, and auctioneer on the FT contract with `storage_deposit`. Bids use `ft_transfer_call` with the auction as receiver, a raw integer amount string, and exactly 1 yoctoNEAR attached.
