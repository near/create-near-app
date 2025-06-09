# contract-py

cargo-near-new-project-description

## How to Build Locally?

Install Python and Emscripten:

```bash
# Install Python (if not already installed)
# Use your system's package manager or download from https://www.python.org/downloads/

# Install Emscripten (required for compiling Python contracts to WebAssembly)
# For Linux/macOS:
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
# Add to your .bashrc or .zshrc for permanent installation:
# echo 'source "/path/to/emsdk/emsdk_env.sh"' >> ~/.bashrc
cd ..

# For Windows:
# Download and extract: https://github.com/emscripten-core/emsdk
# Then in Command Prompt:
# cd emsdk
# emsdk install latest
# emsdk activate latest
# emsdk_env.bat

# Verify installation with:
emcc --version

# Install uv for Python package management
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
```

Then run:

```bash
uvx nearc greeting_contract.py
```

## How to Test Locally?

```bash
uv run pytest
```

## How to Deploy?

To deploy manually, install [`cargo-near`](https://github.com/near/cargo-near) and run:

```bash
# Create a new account
cargo near create-dev-account

# Deploy the contract on it
cargo near deploy <account-id>
```
## Useful Links

- [cargo-near](https://github.com/near/cargo-near) - NEAR smart contract development toolkit for Rust
- [near CLI](https://near.cli.rs) - Iteract with NEAR blockchain from command line
- [NEAR Python SDK Documentation](https://github.com/r-near/near-sdk-py)
- [NEAR Documentation](https://docs.near.org)
- [NEAR StackOverflow](https://stackoverflow.com/questions/tagged/nearprotocol)
- [NEAR Discord](https://near.chat)
- [NEAR Telegram Developers Community Group](https://t.me/neardev)
- NEAR DevHub: [Telegram](https://t.me/neardevhub), [Twitter](https://twitter.com/neardevhub)
