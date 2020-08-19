let fs=require('fs')
// copy created contract name for vue-cli-service at ./.env
const contractNameFilePath = './neardev/dev-account';
const existingContractName = fs.readFileSync(contractNameFilePath, { encoding: "utf8" }).trim();
const vueEnvFile = "./.env.development.local"
fs.writeFileSync(vueEnvFile , "VUE_APP_CONTRACT_NAME=" + existingContractName)
console.log(`copied ${contractNameFilePath} to ${vueEnvFile}`)