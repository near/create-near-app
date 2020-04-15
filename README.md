create-near-app
===============
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nearprotocol/create-near-app) 

Quickly build apps backed by the [NEAR](https://nearprotocol.com) blockchain


Prerequisites
=============

Make sure you have a [current version of Node.js](https://nodejs.org/en/about/releases/) installed – we are targeting versions `12+`.


Getting Started
===============

You can configure two main aspects of your new NEAR project:

* frontend: do you want a **vanilla JavaScript** stack or **React**?
* backend: do you want your contracts to be written in **Rust** or **AssemblyScript** (a dialect of TypeScript)?

| command                                                | frontend   | backend        |
| ------------------------------------------------------ | ---------- | -------------- |
| `npx create-near-app new-awesome-app`                  | React      | AssemblyScript |
| `npx create-near-app --vanilla new-awesome-app`        | vanilla JS | AssemblyScript |
| `npx create-near-app --rust new-awesome-app`           | React      | Rust           |
| `npx create-near-app --vanilla --rust new-awesome-app` | vanilla JS | Rust           |


Develop your own Dapp
=====================

Follow the instructions in the README.md in the project you just created! 🚀


Getting Help
============

Check out our [documentation](https://docs.nearprotocol.com) or chat with us on [Discord](http://near.chat). We'd love to hear from you!
