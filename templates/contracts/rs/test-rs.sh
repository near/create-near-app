#!/bin/sh

# unit testing
cargo test

# sandbox testing
./build.sh
cd sandbox-rs
cargo run --example sandbox "../target/wasm32-unknown-unknown/release/hello_near.wasm"