#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"

# https://docs.near.org/tools/near-cli#near-dev-deploy
near dev-deploy --wasmFile build/hello_near.wasm

export CONTRACT_NAME=$(cat ./neardev/dev-account)

# js contracts always need to be initialized
near call $CONTRACT_NAME init --accountId $CONTRACT_NAME --deposit 1
