import chalk from 'chalk';
import {trackingMessage} from './tracking';
import {Contract, Frontend, ProjectName} from './types';

export const log = (...args: unknown[]) => console.log(...args);

const welcome = () => log(chalk`{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${trackingMessage})
`);

const setupFailed = () => log(chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

const successContractToText = (contract: Contract) => chalk`with a smart contract in {bold ${contract === 'rust' ? 'Rust' : contract === 'js' ? 'JavaScript' : 'AssemblyScript'}}`;
const successFrontendToText = (frontend: Frontend) => frontend === 'none' ? '' : chalk` and a frontend template${frontend === 'react' ? chalk`{bold  in React.js}`: ''}`;
const setupSuccess = (projectName: ProjectName, contract: Contract, frontend: Frontend) => log(chalk`
✅  Success! Created '${projectName}'
   ${successContractToText(contract)}${successFrontendToText(frontend)}.
🧠 See {bold {green README.md}} to get started.
${contract === 'rust' ? chalk`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : '\n'}
Happy Hacking! 👍
{blue ======================================================}`);

const argsError = () => log(chalk`{red Arguments error}
Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> --contract rust|js|assemblyscript --frontend react|vanilla|none`);

const unsupportedNodeVersion = (supported: string) => log(chalk`{red We support node.js version ${supported} or later}`);

const directoryExists = (dirName: string) => log(chalk`{red This directory already exists! ${dirName}}`);

const creatingApp = () =>  log(chalk`...creating a new NEAR app...`);

const depsInstall = () => log(chalk`
{green Installing dependencies in a few folders, this might take a while...}
`);

const depsInstallError = () => log(chalk.red('Error installing NEAR project dependencies'));

export const show = {
  welcome, setupFailed, setupSuccess, argsError,
  unsupportedNodeVersion, directoryExists, creatingApp,
  depsInstall, depsInstallError,
};
