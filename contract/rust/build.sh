#!/bin/bash
set -e

cargo build --release
cp target/wasm32-unknown-unknown/release/status_message.wasm ./res/
