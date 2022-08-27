import shelljs from 'shelljs';

console.log('>> Building contract');

shelljs.exec('near-sdk-js build src/contract.ts build/hello_near.wasm');