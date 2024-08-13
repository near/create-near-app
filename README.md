# Create NEAR App

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nearprotocol/create-near-app)

Quickly build apps backed by the [NEAR](https://near.org) blockchain


## Prerequisites

Make sure you have a [current version of Node.js](https://nodejs.org) installed – we are targeting versions `16+` for JS contracts and `18+` for frontend/gateways.

Read about other [prerequisites](https://docs.near.org/build/smart-contracts/quickstart#prerequisites) in our docs.

## Getting Started

To create a new NEAR project run this and follow interactive prompts:

    npx create-near-app@latest

Follow the instructions in the README.md in the project you just created! 🚀


## Contracts
You can create contracts written in:
- `Javascript`
- `Rust`

:::
We strongly recommend you to follow our [smart contract quickstart](https://docs.near.org/build/smart-contracts/quickstart) if you are new to NEAR contracts.
:::

For testing we use a sandboxed environment. You can write the tests in JavaScript or Rust.

## WebApps

You can create a web application in:

- [Next (Pages Router)](https://nextjs.org/docs/pages/building-your-application/routing)
- [Next (App Router)](https://nextjs.org/docs/app/building-your-application/routing)


:::
We strongly recommend you to follow our [web app quickstart](https://docs.near.org/build/web3-apps/quickstart) if you are new to NEAR WebApps.
:::

> Consider using `pnpm` to handle the frontend, since it is much faster than `npm` and `yarn`.

## Using CLI arguments to run `create-near-app`

This CLI supports arguments to skip interactive prompts

For a Web App:
```shell
npx create-near-app
  <project-name>
  --frontend next-app|next-page|none
  --install
```

For a Smart Contract:

```shell
npx create-near-app
  <project-name>
  --contract ts|rs|none
  --install
```

Use `--install` to automatically install dependencies from all `package.json` files.

When using arguments, all arguments are required, except for `--install`.

## Getting Help

Check out our [documentation](https://docs.near.org) or chat with us on [Discord](http://near.chat). We'd love to hear from you!

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed guidelines on how to contribute to this project.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
