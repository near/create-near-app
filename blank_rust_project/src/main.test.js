const nearlib = require('nearlib');
const CONTRACT_NAME = 'expl3-test';

function getConfig(env) {
    switch (env) {

    case 'production':
    case 'development':
        return {
            networkId: 'default',
            nodeUrl: 'https://rpc.nearprotocol.com',
            contractName: CONTRACT_NAME,
            walletUrl: 'https://wallet.nearprotocol.com',
        };
    default:
        throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
}

async function InitContract() {
    window.nearConfig = getConfig('development')
    console.log('nearConfig', nearConfig);

    // Initializing connection to the NEAR DevNet.
    window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

    // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
    // is hosted at https://wallet.nearprotocol.com
    window.walletAccount = new nearlib.WalletAccount(window.near);

    // Getting the Account ID. If unauthorized yet, it's just empty string.
    window.accountId = window.walletAccount.getAccountId();

    // Initializing our contract APIs by contract name and configuration.
    window.contract = await near.loadContract(nearConfig.contractName, { // eslint-disable-line require-atomic-updates
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ['welcome'],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [],
        // Sender is the account ID to initialize transactions.
        sender: window.accountId,
    });
}

it('welcome test', async () => {
    await InitContract();
    const message = await contract.welcome({name:"test"})
    expect(message).toEqual({"text": "Welcome, test. Welcome to NEAR Protocol chain"})
})