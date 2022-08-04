import chalk from 'chalk';
import {trackingMessage} from './tracking';
import {Contract, Frontend, ProjectName} from './types';

export const log = (...args: unknown[]) => console.log(...args);

export const welcome = () => log(chalk`{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${trackingMessage})
`);

export const setupFailed = () => log(chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

export const successContractToText = (contract: Contract) => chalk`with a smart contract in {bold ${contract === 'rust' ? 'Rust' : contract === 'js' ? 'JavaScript' : 'AssemblyScript'}}`;
export const successFrontendToText = (frontend: Frontend) => frontend === 'none' ? '' : chalk` and a frontend template${frontend === 'react' ? chalk`{bold  in React.js}`: ''}`;
export const setupSuccess = (projectName: ProjectName, contract: Contract, frontend: Frontend, install: boolean) => log(chalk`
{green ======================================================}
✅  Success! Created '${projectName}'
   ${successContractToText(contract)}${successFrontendToText(frontend)}.
${contract === 'rust' ? chalk`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : ''}
  {bold {bgYellow {black Your next steps}}}:
   ${!install ? chalk`- Run {blue npm {bold run deps-install}} to install dependencies in all directories\n`: ''}
   - {inverse Test your contract} in NEAR SandBox:
         {blue npm {bold test}}
   - {inverse Deploy your contract} to NEAR TestNet with a temporary dev account:
         {blue npm {bold run deploy}}
   ${frontend !== 'none' ? chalk`- {inverse Start your frontend}:
         {blue npm {bold start}}\n`: ''}
🧠 See {bold {greenBright README.md}} to explore further.`);

export const argsError = () => log(chalk`{red Arguments error}
Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> --contract rust|js|assemblyscript --frontend react|vanilla|none --tests js|rust`);

export const unsupportedNodeVersion = (supported: string) => log(chalk`{red We support node.js version ${supported} or later}`);

export const windowsWarning = () => log(chalk`👉 Notice: On Windows we recommend using WSL.`);

export const assemblyscriptWarning = () => log(chalk`👉 Notice: AssemblyScript is not supported on all platforms.`);

export const directoryExists = (dirName: string) => log(chalk`{red This directory already exists! ${dirName}}`);

export const creatingApp = () =>  log(chalk`\n...creating a new NEAR app...`);

export const depsInstall = () => log(chalk`
{green Installing dependencies in a few folders, this might take a while...}
`);

export const depsInstallError = () => log(chalk.red('Error installing NEAR project dependencies'));
