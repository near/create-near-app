## Requirements

**IMPORTANT: Make sure you have the latest version of NEAR Shell and Node**

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `node version 10.x`\(Get it [here](https://nodejs.org/en/download)\)
* `near-shell`  The NEAR cli tool.
  * Install with`npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)
* Whatever frontend build tools you prefer.
  * By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).
  * If you're interested in using React, we have an example template [here](https://github.com/nearprotocol/react-template).

You can check your current version with `near --version` and update with `npm upgrade near -g`.

## 1. Create a new project

Choose either the React JS template or vanilla

React JS app:
```bash
npx create-near-app path/to/your/new-awesome-app
```
Plain app:
```bash
npx create-near-app --vanilla path/to/your/new-awesome-app
```

Then go to your project and follow README.md in it.

## 2. Authorize NEAR Shell on your NEAR account

You'll now want to authorize NEAR shell on your NEAR account, which will allow NEAR Shell to deploy contracts on your NEAR account's behalf \(and spend your NEAR account balance to do so\).

Type the command `near login` which should return a url:

```bash
Please navigate to this url and follow the instructions to log in:
https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key={publicKey}
```

From there enter in your terminal the same account ID that you authorized:

`Please enter the accountId that you logged in with: <asdfasdf>`

Once you have entered your account ID, it will display the following message:

`Missing public key for <asdfasdf> in default`
`Logged in with masternode24`

This message is not an error, it just means that it will create a public key for you.

## 3. Write the smart contract

Your project is pre-seeded with a "Hello World" contract which you can deploy right away, so feel free to head to step 4.

If you've already successfully deployed a contract, you'll probably want to start coding your own smart contract. If so, you'll find the below resources helpful.

* [Wrtiting Smart Contracts](../development/writing-smart-contracts.md)
* [Calling Smart Contracts](../development/calling-smart-contracts.md)

For a deep dive into the file structure of a NEAR Project template, take a look here:

[NEAR Smart Contract Development Overview](../quick-start/development-overview.md)

## 4. Create an account for your contract

Let's now deploy your contract to the same TestNet which the NEAR Studio IDE deploys to. Navigate to your source directory in command line, and create an account for your contract

```bash
near create_account <yourcontractname> --masterAccount=<login> --initialBalance <initalbalance>
```

#### masterAccount : specifies which account's key should be used to deploy the contract. This is the account ID you specified when you created your wallet.
#### initialBalance : specifies how much to seed the contract balance with. The current default on TestNet is 10 NEAR.

You should see the success message:

`Account <yourcontractname> for network "default" was created.`

The last step is now to update the src/config.js to use &lt;yourcontractname&gt; for deploy.

```javascript
(function() {
    const CONTRACT_NAME = '<yourcontractname>'; /* TODO: fill this in! */
    const DEFAULT_ENV = 'development';
    ...
})();
```

## 5. Deploy your contract and start the web server

Deploy your contract to TestNet and start web server for the frontend.

```bash
npm run start
```

You can run `npm run start` each time you want to redeploy the updated smart contract, or to restart your web server.

For help using cli tools, use `near`. To get a list of available `npm` scripts use `npm run`.

## 6. Test the smart contract

Within the application's directory run either:

**Test on the TestNet:**

```bash
NODE_ENV=development npm test
```

**Test using locally running node:** \(Using TestNet is recommended for now\)

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 7. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```
