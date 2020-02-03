import "regenerator-runtime/runtime";
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

let near;
let contract;
let accountId;
let walletConnection
beforeAll(async function () {
    // NOTE: nearlib and nearConfig are made available by near-shell/test_environment
    console.log('nearConfig', nearConfig);
    near = await nearlib.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(nearConfig.contractName, {
        viewMethods: ['welcome'],
        changeMethods: [],
        sender: accountId
    });

    // Fake instance of WalletConnection
    // Feel free to modify for specific tests
    walletConnection = {
      requestSignIn() {
      },
      signOut() {
      },
      isSignedIn() {
        return true;
      },
      getAccountId() {
        return accountId;
      }
    }
});

it('renders without crashing', () => {
  const app = renderer.create(<App contract={contract} wallet={walletConnection}/>);
  let tree = app.toJSON();
  expect(tree).toMatchSnapshot();
});
