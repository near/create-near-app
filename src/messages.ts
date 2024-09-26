import chalk from 'chalk';
import { trackingMessage } from './tracking';
import { Contract, Frontend, FrontendMessage, ProjectName } from './types';

if (process.env.NEAR_NO_COLOR) {
  chalk.level = 0;
}

export const show = (...args: unknown[]) => console.log(...args);

export const welcome = () =>
  show(chalk`
{blue ======================================================}
👋 {bold {green Welcome to Near!}} Learn more: https://docs.near.org/
🔧 Let's get your project ready.
{blue ======================================================}
(${trackingMessage})\n`);

export const setupFailed = () =>
  show(chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during the project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

export const successContractToText = (contract: Contract) =>
  contract === 'none'
    ? ''
    : chalk`a smart contract in {bold ${
      contract === 'rust' ? 'Rust' : 'Typescript'
    }}`;

const frontendTemplates: FrontendMessage = {
  'next-page': 'NextJS (Classic)',
  'next-app': 'NextJS (App Router)'
};

export const successFrontendToText = (frontend: Frontend) =>
  frontend === 'none'
    ? ''
    : chalk`a web-app using ${frontendTemplates[frontend]}`;

export const setupSuccess = (
  projectName: ProjectName,
  contract: Contract,
  frontend: Frontend,
  install: boolean
) =>
  show(chalk`
{green ======================================================}
✅  Success! Created '${projectName}', ${successContractToText(
  contract
)}${successFrontendToText(frontend)}.
${
  contract === 'rust'
    ? chalk`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n`
    : ''
}
{bold {bgYellow {black Next steps}}}:
${contractInstructions(projectName, contract, install)}${gatewayInstructions(
  projectName,
  frontend,
  install
)}`);

export const contractInstructions = (
  projectName: ProjectName,
  contract: Contract,
  install: boolean
) =>
  contract === 'none'
    ? ''
    : chalk`
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
${
  contract === 'javascript' && !install
    ? chalk`   - {inverse Install all dependencies}
         {blue npm {bold install}}`
    : 'Then:'
}
   - {inverse Build your contract}:
         ${
  contract === 'javascript'
    ? chalk`{blue npm {bold run build}}`
    : chalk`{blue {bold cargo near build}}`
}
   - {inverse Test your contract} in the Sandbox:
         ${
  contract === 'javascript'
    ? chalk`{blue npm {bold run test}}`
    : chalk`{blue {bold cargo test}}`
}
   
🧠 Read {bold {greenBright README.md}} to explore further`;

export const gatewayInstructions = (
  projectName: ProjectName,
  frontend: Frontend,
  install: boolean
) =>
  frontend === 'none'
    ? ''
    : chalk`
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
${
  !install
    ? chalk`   - {inverse Install all dependencies}
         {blue npm {bold install}}`
    : 'Then:'
}
   - {inverse Start your app}:
         {blue npm {bold run dev}}`;

export const argsError = (msg: string) =>
  show(chalk`{red Arguments error: {white ${msg}}}

Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> [--frontend next-app|next-page] [--contract rs|ts|none]`);

export const unsupportedNodeVersion = (supported: string) =>
  show(chalk`{red We support node.js version ${supported} or later}`);

export const windowsWarning = () =>
  show(chalk`{red Please use Windows Subsystem for Linux (WSL) to develop smart contracts}
{yellow Learn more here: https://docs.near.org/blog/getting-started-on-windows}
`);

export const directoryExists = (dirName: string) =>
  show(chalk`{red This directory already exists! ${dirName}}`);

export const creatingApp = () => show(chalk`\nCreating a new {bold NEAR dApp}`);

export const depsInstall = () =>
  show(chalk`
{green Installing dependencies in a few folders, this might take a while.}
`);

export const depsInstallError = () =>
  show(chalk.red('Error installing NEAR project dependencies'));
