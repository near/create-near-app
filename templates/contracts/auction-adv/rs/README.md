# Auction contract with FTs

This directory contains a Rust contract that is used as part of the [Bidding with FTs](https://docs.near.org/tutorials/auction/bidding-with-fts) section of the auction tutorial.

In this part the contract is adapted so users can bid in fungible tokens (FTs) instead of NEAR tokens. It is a great way to learn how to work with FTs in NEAR.

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

To deploy manually, install [NEAR CLI](https://docs.near.org/tools/near-cli#installation) and run:

```bash
# Create a new account
near create <contractId> --useFaucet

# Deploy the contract on it
near deploy <contractId> ./target/near/auction-contract.wasm

# Initialize the contract
TWO_MINUTES_FROM_NOW=$(date -v+2M +%s000000000)
near call <contractId> init '{"end_time": "'$TWO_MINUTES_FROM_NOW'", "auctioneer": "<auctioneerAccountId>", "ft_contract": "<ftContractId>", "nft_contract": "<nftContractId>", "token_id": "<tokenId>", "starting_price": "<startingPrice>"}' --accountId <contractId>
```