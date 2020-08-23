import { writeFileSync } from 'fs';
require('dotenv').config({ path: './neardev/dev-account.env' });
const colors = require('colors');

const targetPath = './src/contract-name.ts';
const contractNameFileContent = `export const CONTRACT_NAME = '${process.env.CONTRACT_NAME || 'near-blank-project'}';`;

console.log(colors.magenta('The file `contract-name.ts` will be written with the following content: \n'));
console.log(colors.grey(contractNameFileContent, '\n'));

try {
  writeFileSync(targetPath, contractNameFileContent);
  console.log(colors.magenta(`contract-name.ts file generated correctly at ${targetPath} \n`));
} catch (error) {
  console.error(error);
}
