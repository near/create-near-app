## Requirements

**IMPORTANT: Make sure you have the latest version of NEAR Shell and Node**

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `node version 10.x`\(Get it [here](https://nodejs.org/en/download)\)
* `near-shell`  The NEAR cli tool.
  * Install with`npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)
  * remember to always update to the latest version
* Whatever frontend build tools you prefer. We provide React template by default.
  * By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).

## Create a new project

Choose either the React JS template or vanilla one

#### React JS app:
```bash
npm init near-app path/to/your/new-awesome-app
```
with npx:

```bash
npx create-near-app path/to/your/new-awesome-app
```
with yarn:
```bash
yarn create near-app path/to/your/new-awesome-app
```

#### Plain app:
```bash
npm init near-app --vanilla path/to/your/new-awesome-app
```
with npx:

```bash
npx create-near-app --vanilla path/to/your/new-awesome-app
```
with yarn:
```bash
yarn create near-app --vanilla path/to/your/new-awesome-app
```

## Develop your own Dapp

#### Simple Tip
After create project, run ```npm run dev:deploy:contract``` to start and get familiar with features.

#### Next step
Follow the instructions in the README.md in the project you just created and enjoy the development with NEAR. 

We have [documentation](https://docs.nearprotocol.com) with lots of examples. We have support at [Discord](http://near.chat) and really welcome.