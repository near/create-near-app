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


### Contracts
You can create contracts written in:
- `Javascript`
- `Rust`

:::
We strongly recommend you to follow our [smart contract quickstart](https://docs.near.org/build/smart-contracts/quickstart) if you are new to NEAR contracts.
:::

For testing we use a sandboxed environment. You can write the tests in JavaScript or Rust.

### WebApps

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


## Contributing to `create-near-app`

To make changes to `create-near-app` itself:

* clone the repository (Windows users, [use `git clone -c core.symlinks=true`](https://stackoverflow.com/a/42137273/249801))
* in your terminal, enter one of the folders inside `templates`, such as `templates/frontend/next-app`
* now you can run `pnpm install` to install dependencies and `pnpm run dev` to run the local development server, just like you can in a new app created with `create-near-app`


#### About commit messages

`create-near-app` uses semantic versioning and auto-generates nice release notes & a changelog all based off of the commits. We do this by enforcing [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). In general the pattern mostly looks like this:

    type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")

Real world examples can look like this:

    chore: run tests with GitHub Actions

    fix(server): send cors headers

    feat(blog): add comment section

If your change should show up in release notes as a feature, use `feat:`. If it should show up as a fix, use `fix:`. Otherwise, you probably want `refactor:` or `chore:`. [More info](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)


#### Deploy `create-near-app`

If you want to deploy a new version, you will need two prerequisites:

1. Get publish-access to [the NPM package](https://www.npmjs.com/package/near-api-js)
2. Get write-access to [the GitHub repository](https://github.com/near/near-api-js)
3. Obtain a [personal access token](https://gitlab.com/profile/personal_access_tokens) (it only needs the "repo" scope).
4. Make sure the token is [available as an environment variable](https://github.com/release-it/release-it/blob/master/docs/environment-variables.md) called `GITHUB_TOKEN`

Then run one script:

    npm run release

Or just `release-it`


## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
