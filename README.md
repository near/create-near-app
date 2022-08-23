# Create NEAR App
===============
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nearprotocol/create-near-app) 

Quickly build apps backed by the [NEAR](https://near.org) blockchain


## Prerequisites

Make sure you have a [current version of Node.js](https://nodejs.org/en/about/releases/) installed – we are targeting versions `16+`.

Read about other [prerequisites](https://docs.near.org/develop/prerequisites) in our docs.

## Getting Started

To create a new NEAR project run this and follow interactive prompts:

    npx create-near-app

> If you've previously installed `create-near-app` globally via `npm install -g create-near-app`, please uninstall the package using `npm uninstall -g create-near-app` to ensure that `npx` always uses the latest version.

Follow the instructions in the README.md in the project you just created! 🚀

You can create contracts written in:

- [JavaScript](https://docs.near.org/develop/quickstart-guide)
- [Rust](https://docs.near.org/develop/prerequisites)
- AssemblyScript

You can create a frontend template in:

- [React](https://reactjs.org/)
- Vanilla JavaScript

For testing we use a sandboxed environment of NEAR (called Workspaces).
You can write the tests in JavaScript or Rust.

### Using CLI arguments to run `create-near-app`

This CLI supports arguments to skip interactive prompts:

```shell
npx create-near-app
  <project-name>
  --contract js|rust|assemblyscript
  --frontend vanilla|react|none
  --tests js|rust
  --install
```

Use `--install` to automatically install dependencies from all `package.json` files.

When using arguments, all arguments are required, except for `--install`.

## Getting Help

Check out our [documentation](https://docs.near.org) or chat with us on [Discord](http://near.chat). We'd love to hear from you!


## Contributing to `create-near-app`

To make changes to `create-near-app` itself:

* clone the repository (Windows users, [use `git clone -c core.symlinks=true`](https://stackoverflow.com/a/42137273/249801))
* in your terminal, enter one of the folders inside `templates`, such as `templates/vanilla`
* now you can run `npm install` to install dependencies and `npm run dev` to run the local development server, just like you can in a new app created with `create-near-app`


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
