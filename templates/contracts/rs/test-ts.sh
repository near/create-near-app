#!/bin/sh

# unit testing
cargo test

# sandbox testing
./build.sh
cd sandbox-ts
npm i
npm run test -- -- "../target/wasm32-unknown-unknown/release/hello_near.wasm"