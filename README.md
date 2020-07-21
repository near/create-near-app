create-near-app
===============
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nearprotocol/create-near-app) 

Quickly build apps backed by the [NEAR](https://near.org) blockchain


Prerequisites
=============

Make sure you have a [current version of Node.js](https://nodejs.org/en/about/releases/) installed – we are targeting versions `12+`.
**Note**: if using Node version 13 please be advised that you will need version >= 13.7.0


Getting Started
===============

To create a new NEAR project with default settings, you just need one command

Using [npm's npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner):

    npx create-near-app [options] new-awesome-project

**Or**, if you prefer [yarn](https://classic.yarnpkg.com/en/docs/cli/create/):

    yarn create near-app [options] new-awesome-project

Without any options, this will create a project with a **vanilla JavaScript** frontend and an [AssemblyScript](https://docs.near.org/docs/roles/developer/contracts/assemblyscript) smart contract

Other options:

* `--frontend=react` – use [React](https://reactjs.org/) for your frontend template
* `--contract=rust` – use [Rust](https://docs.near.org/docs/roles/developer/contracts/near-sdk-rs) for your smart contract


Develop your own Dapp
=====================

Follow the instructions in the README.md in the project you just created! 🚀


Getting Help
============

Check out our [documentation](https://docs.near.org) or chat with us on [Discord](http://near.chat). We'd love to hear from you!


Contributing
============

To make changes to `create-near-app` itself:

* clone the repository (Windows users, [use `git clone -c core.symlinks=true`](https://stackoverflow.com/a/42137273/249801))
* in your terminal, enter one of the folders inside `templates`, such as `templates/vanilla`
* now you can run `yarn` to install dependencies and `yarn dev` to run the local development server, just like you can in a new app created with `create-near-app`

If you want to deploy a new version, you will need two prerequisites:

1. Get write-access to [the GitHub repository](https://github.com/near/near-api-js)
2. Get publish-access to [the NPM package](https://www.npmjs.com/package/near-api-js)

Then run one script:

    yarn release

Since we use `commitlint` to ensure that all commits follow [the Conventional Commit spec](https://www.conventionalcommits.org/), our `release` script is able to automatically bump version numbers and update the CHANGELOG based on commit history.


License
=======

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
See [LICENSE](LICENSE) and [LICENSE-APACHE](LICENSE-APACHE) for details.
