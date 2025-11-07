# Basic Auction Contract

This directory contains a JavaScript contract that is used as part of the [Basic Auction Tutorial](https://docs.near.org/tutorials/auction/basic-auction).

The contract is a simple auction where you can place bids, view the highest bid, and claim the tokens at the end of the auction.

This repo showcases the basic anatomy of a contract including how to store data in a contract, how to update the state, and then how to view it. It also looks at how to use environment variables and macros. We have also written sandbox test the contract locally.

---

## How to Build Locally?

Install the [NEAR CLI](https://docs.near.org/tools/near-cli#installation) and run:

Install the dependencies:

```bash
npm install
```

Build the contract:

```bash
npm run build
```

## How to Test Locally?

```bash
npm run test
```

## How to Deploy?

Install the [NEAR CLI](https://docs.near.org/tools/near-cli#installation) and run:

```bash
# Create a new account
near create <contractId> --useFaucet

# Deploy the contract
near deploy <contractId> ./build/auction-contract.wasm

# Initialize the contract
TWO_MINUTES_FROM_NOW=$(date -v+2M +%s000000000)
near call <contractId> init '{"end_time": "'$TWO_MINUTES_FROM_NOW'", "auctioneer": "<auctioneerAccountId>"}' --accountId <contractId>
```