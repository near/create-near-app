import chalk from 'chalk';
import {trackingMessage} from './tracking';
import {Contract, Frontend, ProjectName} from './types';

if (process.env.NEAR_NO_COLOR) {
  chalk.level = 0;
}

export const show = (...args: unknown[]) => console.log(...args);

export const welcome = () => show(chalk`{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${trackingMessage})
`);

export const setupFailed = () => show(chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

export const successContractToText = (contract: Contract) => chalk`with a smart contract in {bold ${contract === 'rust' ? 'Rust' : 'JavaScript'}}`;
export const successFrontendToText = (frontend: Frontend) => frontend === 'none' ? '' : chalk` and a frontend template${frontend === 'react' ? chalk`{bold  in React.js}` : ''}`;
export const setupSuccess = (projectName: ProjectName, contract: Contract, frontend: Frontend, install: boolean) => show(chalk`
{green ======================================================}
✅  Success! Created '${projectName}'
   ${successContractToText(contract)}${successFrontendToText(frontend)}.
${contract === 'rust' ? chalk`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : ''}
  {bold {bgYellow {black Your next steps}}}:
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
   ${!install ? chalk`- {inverse Install all dependencies}
         {blue npm {bold install}}` : 'Then:'}
   - {inverse Build your contract}:
         {blue npm {bold run build}}
   - {inverse Test your contract} in NEAR SandBox:
         {blue npm {bold test}}
   - {inverse Deploy your contract} to NEAR TestNet with a temporary dev account:
         {blue npm {bold run deploy}}
   ${frontend !== 'none' ? chalk`- {inverse Start your frontend}:
         {blue npm {bold start}}\n` : ''}
🧠 Read {bold {greenBright README.md}} to explore further.`);

export const argsError = () => show(chalk`{red Arguments error}
Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> --contract rust|js --frontend react|vanilla|none --tests js|rust`);

export const unsupportedNodeVersion = (supported: string) => show(chalk`{red We support node.js version ${supported} or later}`);

export const windowsWarning = () => show(chalk`{bgYellow {black Notice: On Win32 please use WSL (Windows Subsystem for Linux).}}
https://docs.microsoft.com/en-us/windows/wsl/install
Exiting now.`);

export const directoryExists = (dirName: string) => show(chalk`{red This directory already exists! ${dirName}}`);

export const creatingApp = () => show(chalk`\nCreating a new {bold NEAR dApp}`);

export const depsInstall = () => show(chalk`
{green Installing dependencies in a few folders, this might take a while.}
`);

export const depsInstallError = () => show(chalk.red('Error installing NEAR project dependencies'));
