import chalk from 'chalk';
import { makeTaggedTemplate } from 'chalk-template';
import { trackingMessage } from './tracking';
import { Frontend, ProjectName } from './types';

const chalkTemplate = makeTaggedTemplate(chalk);

if (process.env.NEAR_NO_COLOR) {
  chalk.level = 0;
}

export const show = (...args: unknown[]) => console.log(...args);

export const welcome = () =>
  show(chalkTemplate`
{blue ======================================================}
👋 {bold {green Welcome to Near!}} Learn more: https://docs.near.org/
🔧 Let's get your project ready.
{blue ======================================================}
(${trackingMessage})\n`);

export const setupFailed = () =>
  show(chalkTemplate`{bold {red ==========================================}}
{red ⛔️ There was a problem during the project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

export const successContractToText = (contract: boolean) =>
  contract ? chalkTemplate`a smart contract in {bold Rust}` : '';

const frontendTemplates: Record<Frontend, string> = {
  'next-app': 'Next.js (App Router)',
  'vite-react': 'Vite (React)',
};

export const successFrontendToText = (frontend?: Frontend) =>
  frontend ? chalkTemplate`a web-app using ${frontendTemplates[frontend]}` : '';

export const setupSuccess = (
  projectName: ProjectName,
  contract: boolean,
  frontend: Frontend | undefined,
  install: boolean,
  needsToInstallCargoNear: boolean
) =>
  show(chalkTemplate`
✅ Success! Created '${projectName}', ${successContractToText(
  contract
)}${successFrontendToText(frontend)}.
${
  contract
    ? chalkTemplate`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n`
    : ''
}
{bold {bgYellow {black Next steps}}}:
${contractInstructions(projectName, contract, needsToInstallCargoNear)}${gatewayInstructions(
  projectName,
  frontend,
  install
)}`);

export const contractInstructions = (
  projectName: ProjectName,
  contract: boolean,
  needsToInstallCargoNear: boolean
) => {
  if (!contract) return '';
  const installCargo = needsToInstallCargoNear
    ? chalkTemplate`   - {inverse Install cargo-near}:
         {blue https://github.com/near/cargo-near}
`
    : '';
  return chalkTemplate`${installCargo}   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
   - {inverse Build your contract}:
         {blue {bold cargo near build non-reproducible-wasm}}
   - {inverse Test your contract} in the Sandbox:
         {blue {bold cargo test --locked}}

🧠 Read {bold {greenBright README.md}} to explore further`;
};

export const gatewayInstructions = (
  projectName: ProjectName,
  frontend: Frontend | undefined,
  install: boolean
) =>
  !frontend
    ? ''
    : chalkTemplate`
   - {inverse Navigate to your project}:
         {blue cd {bold ${projectName}}}
${
  !install
    ? chalkTemplate`   - {inverse Install all dependencies}
         {blue npm {bold install}}`
    : 'Then:'
}
   - {inverse Start your app}:
         {blue npm {bold run dev}}`;

export const argsError = (msg: string) =>
  show(chalkTemplate`{red Arguments error: {white ${msg}}}

Run {blue npx create-near-app} without arguments, or use:
npx create-near-app <projectName> --contract [--template auction|auction-adv]
npx create-near-app <projectName> --frontend next-app|vite-react [--install]`);

export const unsupportedNodeVersion = (supported: string) =>
  show(chalkTemplate`{red We support node.js version ${supported} or later}`);

export const windowsWarning = () =>
  show(chalkTemplate`{red Please use Windows Subsystem for Linux (WSL) to develop smart contracts}
{yellow Learn more here: https://docs.near.org/blog/getting-started-on-windows}
`);

export const directoryExists = (dirName: string) =>
  show(chalkTemplate`{red This directory already exists! ${dirName}}`);

export const creatingApp = () => show(chalkTemplate`\n- Creating a new {bold NEAR dApp}...`);

// Installing dependencies messages
export const depsInstall = () =>
  show(chalkTemplate`- Installing frontend dependencies, this might take a while...`);

export const depsInstallError = () =>
  show(chalk.red('Error installing NEAR project dependencies'));

// Checking cargo-near messages
export const checkingCargoNear = () => show(chalkTemplate`- Checking if cargo-near extension is installed...`);
export const cargoNearIsNotInstalled = () => show(chalkTemplate`  {bold {yellow Did not find cargo-near, please install it to build and deploy Rust contracts: https://github.com/near/cargo-near}}`);