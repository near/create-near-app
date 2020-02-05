FROM gitpod/workspace-full

RUN .cargo/bin/rustup target add wasm32-unknown-unknown
