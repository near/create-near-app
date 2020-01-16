<br />
<br />

<p>
<img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" width="240">
</p>

<br />
<br />

## Template for NEAR dapps

### Features
* Create NEAR dapps with a React frontend 🐲
* We got Gulp! 💦

### Requirements
##### IMPORTANT: Make sure you have the latest version of NEAR Shell and Node Version > 10.x 
1. node and npm
2. near shell
```
npm i -g near-shell
```
3.(optional) install yarn to build
```
npm i -g yarn
```

### To run on testnet
#### Step 1: Create account for the contract and deploy the contract.
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

#### Step 2:
Modify src/config.js line that sets the contractName. Set it to id from step 1.
```javascript
(function() {
    const CONTRACT_NAME = 'react-template'; /* TODO: Change this to your contract's name! */
    const DEFAULT_ENV = 'development';
    ...
})();
```

#### Step 3:
Finally, run the command in your terminal.
```
npm install
npm run(yarn) prestart
npm run(yarn) start
```
The server that starts is for static assets and by default serves them to localhost:3000. Navigate there in your browser to see the app running!

### Deploy
Check the scripts in the package.json, for frontend and backend both, run the command:
```bash
npm run(yarn) deploy
```

### Test
For test file src/App.test.js, it works for the template after finishing step 3 above. If smart contract and index.js change, user should change to their functions to test. The command is:
```bash
npm run(yarn) test
```

### To Explore

- `assembly/main.ts` for the contract code
- `public/index.html` for the front-end HTML
- `src/index.js` for the JavaScript front-end code and how to integrate contracts
- `src/App.js` for the first react component
