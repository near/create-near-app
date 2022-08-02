Hello NEAR!
===========

A [smart contract] written in [AssemblyScript] for an app initialized with [create-near-app]


Quick Start
===========

Before you compile this code, you will need to install [Node.js] ≥ 16


Exploring The Code
==================

1. The main smart contract code lives in `assembly/index.ts`.
2. There are two functions to the smart contract: `get_greeting` and `set_greeting`.
3. Tests: You can run smart contract tests with the `npm run test` script. This runs
   standard AssemblyScript tests using [as-pect].


  [smart contract]: https://docs.near.org/develop/welcome
  [AssemblyScript]: https://www.assemblyscript.org/
  [create-near-app]: https://github.com/near/create-near-app
  [Node.js]: https://nodejs.org/en/download/package-manager/
  [as-pect]: https://www.npmjs.com/package/@as-pect/cli
