#!/bin/sh

./build.sh

# Deploy the contract with an auto-generated development account
rm -rf neardev
# https://docs.near.org/tools/near-cli#near-dev-deploy
near dev-deploy --wasmFile build/hello_near.wasm

export $(cat ./neardev/dev-account.env)

near call $CONTRACT_NAME init --accountId $CONTRACT_NAME --deposit 1

echo $CONTRACT_NAME