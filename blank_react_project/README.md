<br />
<br />

<p>
<img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" width="240">
</p>

<br />
<br />

## Template for NEAR dapps
### Requirements
##### IMPORTANT: Make sure you have the latest version of NEAR Shell and Node Version > 10.x 
1. node and npm
2. near shell
install with 
```
npm i -g near-shell
```
3.(optional) install yarn to build
```
npm i -g yarn
```

### Features
* Create NEAR dapps with a React frontend 🐲
* We got Gulp! 💦
* We got Corgis? [🐶](https://corgis.nearprotocol.com) 

### To run on testnet
Step 1: Create account for the contract and deploy the contract.
In the terminal
```
near login
```
click the link and create your own contract ID

Step 2:
modify src/config.js line that sets the contractName. Set it to id from step 1.
```
const CONTRACT_NAME = "contractId"; /* TODO: fill this in! */
```
Step 3:
deploy the smart contract, run the command:
```
npm run deploy:contract
```
Step 4:
Finally, run the command in your terminal.
```
npm intall && npm start
```
```
yarn install && yarn start
```
The server that starts is for static assets and by default serves them to localhost:5000. Navigate there in your browser to see the app running!

## To Explore

- `assembly/main.ts` for the contract code
- `src/index.html` for the front-end HTML
- `src/main.js` for the JavaScript front-end code and how to integrate contracts
- `src/app.js` for the first react component
