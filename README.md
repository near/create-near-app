# Create NEAR App

Scaffold a Rust smart contract or a React frontend for the [NEAR blockchain](https://near.org).

## Prerequisites

Install Node.js **22.22.2+, 24.15+, or 26+**. For contracts, install [Rust](https://rustup.rs) and [cargo-near](https://github.com/near/cargo-near). Windows contract developers should use WSL.

## Getting started

```sh
npx create-near-app@latest
```

Choose one project type:

- **Smart contract:** a basic auction using NEAR, or an advanced auction using fungible tokens with an NFT prize. Both use `near-sdk`, with local integration tests using `near-sandbox` and `near-api`.
- **Frontend:** Next.js with App Router, or Vite with React. Both use TypeScript, NEAR Connect, and `near-api-js` to interact with the deployed Hello NEAR contract.

Follow the generated project's README for build, testing, and deployment instructions. See the [contract quickstart](https://docs.near.org/build/smart-contracts/quickstart) or [frontend quickstart](https://docs.near.org/build/web3-apps/quickstart) to learn more.

## CLI arguments

Create a Rust contract (defaults to the basic auction):

```sh
npx create-near-app@latest my-contract --contract
npx create-near-app@latest my-auction --contract --template auction-adv
```

Create a frontend:

```sh
npx create-near-app@latest my-web-app --frontend next-app --install
npx create-near-app@latest my-web-app --frontend vite-react --install
```

Choose exactly one of `--contract` or `--frontend`. `--template auction|auction-adv` applies only to contracts; `--install` runs `npm install` for a frontend.

Contract language arguments (`--contract rs`, `--contract ts`), `none` values, and the legacy `next-page` frontend are no longer supported. Use `--contract` for Rust and `--frontend next-app` for Next.js App Router.

## Contributing

```sh
npm install
npm test
npm run lint
```

Package versions follow stable releases. TypeScript stays on 6.0 while the lint/test tools require it; the Next.js template uses ESLint 9 because its React lint plugins do not yet support ESLint 10. The scaffolder and Vite template use ESLint 10.

Templates live in `templates/contracts/auction`, `templates/contracts/auction-adv`, and `templates/frontend/{next-app,vite-react}`. Contract templates follow [auctions-tutorial](https://github.com/near-examples/auctions-tutorial); frontend wallet integration follows [hello-near-examples](https://github.com/near-examples/hello-near-examples).

Run `npm run test-e2e` to scaffold and test both contracts and build and lint both frontends. This requires the Rust toolchain and cargo-near, and downloads dependencies and the NEAR sandbox binary.

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for changes. Maintainers with npm publish and GitHub repository access can publish with `npm run release` (requires `GITHUB_TOKEN`).

## Getting help

Read the [documentation](https://docs.near.org) or join [Discord](https://near.chat).

## License

Distributed under the MIT and Apache 2.0 licenses. See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE).
