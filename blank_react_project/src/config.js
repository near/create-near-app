(function() {
    const CONTRACT_NAME = 'react-template'; /* TODO: fill this in!*/
    const DEFAULT_ENV = 'development'; 
    
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
        case 'staging':
            return {
                networkId: 'staging',
                nodeUrl: 'https://staging-rpc.nearprotocol.com/',
                contractName: CONTRACT_NAME,
                walletUrl: 'https://near-wallet-staging.onrender.com',
            };
        case 'local':
            return {
                networkId: 'local',
                nodeUrl: 'http://localhost:3030',
                keyPath: `${process.env.HOME}/.near/validator_key.json`,
                walletUrl: 'http://localhost:4000/wallet',
                contractName: CONTRACT_NAME,
            };
        case 'ci':
            return {
                networkId: 'shared-test',
                nodeUrl: 'http://shared-test.nearprotocol.com:3030',
                contractName: CONTRACT_NAME,
                masterAccount: 'test.near',
            };
        case 'ci-staging':
            return {
                networkId: 'shared-test-staging',
                nodeUrl: 'http://staging-shared-test.nearprotocol.com:3030',
                contractName: CONTRACT_NAME,
                masterAccount: 'test.near',
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
        }
    }
    
    let Cookies = require('js-cookie');
    const cookieConfig = typeof Cookies != 'undefined' && Cookies.getJSON('fiddleConfig');
    if (typeof module !== 'undefined' && module.exports) {
        console.log("module works")
        module.exports = getConfig;
    } else {
        console.log("Cookie works")
        window.nearConfig =  cookieConfig && cookieConfig.nearPages ? cookieConfig : getConfig(DEFAULT_ENV);
    }
})();
