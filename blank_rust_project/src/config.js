const CONTRACT_NAME = process.env.CONTRACT_NAME ||'near-blank-project';

function getConfig(env) {
    switch (env) {

    case 'production':
    case 'mainnet':
        return {
            networkId: 'mainnet',
            nodeUrl: 'https://rpc.mainnet.near.org',
            contractName: CONTRACT_NAME,
            walletUrl: 'https://wallet.mainnet.near.org',
            helperUrl: 'https://helper.mainnet.near.org',
        };
    case 'development':
    case 'testnet':
        return {
            networkId: 'default',
            nodeUrl: 'https://rpc.testnet.near.org',
            contractName: CONTRACT_NAME,
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
        };
    case 'devnet':
        return {
            networkId: 'devnet',
            nodeUrl: 'https://rpc.devnet.near.org',
            contractName: CONTRACT_NAME,
            walletUrl: 'https://wallet.devnet.near.org',
            helperUrl: 'https://helper.devnet.near.org',
        };
    case 'betanet':
        return {
            networkId: 'betanet',
            nodeUrl: 'https://rpc.betanet.near.org',
            contractName: CONTRACT_NAME,
            walletUrl: 'https://wallet.betanet.near.org',
            helperUrl: 'https://helper.betanet.near.org',
        };
    case 'local':
        return {
            networkId: 'local',
            nodeUrl: 'http://localhost:3030',
            keyPath: `${process.env.HOME}/.near/validator_key.json`,
            walletUrl: 'http://localhost:4000/wallet',
            contractName: CONTRACT_NAME,
        };
    case 'test':
    case 'ci':
        return {
            networkId: 'shared-test',
            nodeUrl: 'https://rpc.ci-testnet.near.org',
            contractName: CONTRACT_NAME,
            masterAccount: 'test.near',
        };
    case 'ci-betanet':
        return {
            networkId: 'shared-test-staging',
            nodeUrl: 'https://rpc.ci-betanet.near.org',
            contractName: CONTRACT_NAME,
            masterAccount: 'test.near',
        };
    default:
        throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
}

module.exports = getConfig;
