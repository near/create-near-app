#!/bin/sh

./build.sh

echo ">> Deploying contract"

# https://docs.near.org/tools/near-cli#near-dev-deploy
near dev-deploy --wasmFile build/hello_near.wasm

export $(cat ./neardev/dev-account.env)

# js contracts always need to be initialized
near call $CONTRACT_NAME init --accountId $CONTRACT_NAME --deposit 1
