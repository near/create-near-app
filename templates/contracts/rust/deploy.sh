#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"

# https://docs.near.org/tools/near-cli#near-dev-deploy
near dev-deploy --wasmFile ./target/wasm32-unknown-unknown/release/hello_near.wasm

# if ../frontend folder exists, copy the env file there
if [ -d "../frontend" ]; then
    (echo ; cat ./neardev/dev-account.env) >> ../frontend/.env
fi