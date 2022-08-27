import shelljs from 'shelljs';

import './build';

console.log('>> Deploying contract');

// https://docs.near.org/tools/near-cli#near-dev-deploy
shelljs.exec('near dev-deploy --wasmFile build/hello_near.wasm');

const CONTRACT_NAME = shelljs.cat('./neardev/dev-account');

// js contracts always need to be initialized
shelljs.exec(`near call ${CONTRACT_NAME} init --accountId ${CONTRACT_NAME} --deposit 1`);
