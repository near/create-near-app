// #!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { createProject, runDepsInstall } from './make';
import { trackUsage, trackingMessage } from './tracking';
import semver from 'semver';
import { showUserPrompts, getUserArgs, userAnswersAreValid, showDepsInstallPrompt } from './user-input';

const WELCOME_MESSAGE = (chalk`{blue ======================================================}
👋 {bold {green Welcome to NEAR!}} Learn more: https://docs.near.org/
🔧 Let's get your dApp ready.
{blue ======================================================}
(${trackingMessage})
`);

const SETUP_FAILED_MSG = (chalk`{bold {red ==========================================}}
{red ⛔️ There was a problem during NEAR project setup}.
Please refer to https://github.com/near/create-near-app README to troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

const contractToText = contract => chalk`with a smart contract in {bold ${contract === 'rust' ? 'Rust' : contract === 'js' ? 'JavaScript' : 'AssemblyScript'}}`;
const frontendToText = frontend => frontend === 'none' ? '' : chalk` and a frontend template${frontend === 'react' ? chalk`{bold  in React.js}`: ''}`;
const SETUP_SUCCESS_MSG = (projectName, contract, frontend) => (chalk`
✅  Success! Created '${projectName}' ${contractToText(contract)}${frontendToText(frontend)}.
🧠 See {bold ${projectName}/{green README.md}} to get started.
${contract === 'rust' ? chalk`🦀 If you are new to Rust please visit {bold {green https://www.rust-lang.org }}\n` : '\n'}
Happy Hacking! 👍
{blue ======================================================}`);

// Execute the tool
(async function run() {
  console.log(WELCOME_MESSAGE);
  // Check they have the right node.js version
  const current = process.version;
  const supported = require('../package.json').engines.node;

  if (!semver.satisfies(current, supported)) {
    console.log(chalk.red(`We support node.js version ${supported} or later`));
    // TODO: track unsupported versions
    return;
  }

  // Get and track the user input
  let config = null;
  let configIsFromPrompts = false;
  try {
    config = await getUserArgs();
  } catch(e) {
    console.log(chalk.red(`Bad arguments.`));
    return;
  }
  if (config === null) {
    const userInput = await showUserPrompts();
    configIsFromPrompts = true;
    if (!userAnswersAreValid(userInput)) {
      console.log('Invalid prompt.');
      return;
    }
    config = userInput;
  }
  const {frontend, contract, projectName} = config;
  trackUsage(frontend, contract);

  // Make sure the project folder does not exist
  const dirName = `${process.cwd()}/${projectName}`;
  if (fs.existsSync(dirName)) {
    console.log(chalk.red(`This directory already exists! ${dirName}`));
    return;
  }

  // sanbox should be well supported by now, assemblyscript will be deprecated soon
  const supportsSandbox = true; // (os.type() === 'Linux' || os.type() === 'Darwin') && os.arch() === 'x64';

  // Create the project
  let createSuccess;
  const projectPath = path.resolve(process.cwd(), projectName);
  try {
    createSuccess = await createProject({
      contract,
      frontend,
      projectName,
      supportsSandbox,
      verbose: false,
      rootDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
  } catch(e) {
    console.error(e);
    createSuccess = false;
  }

  if(createSuccess){
    console.log(SETUP_SUCCESS_MSG(projectName, contract, frontend));
  }else{
    console.log(SETUP_FAILED_MSG);
    return;
  }
  if (configIsFromPrompts) {
    const { depsInstall } = await showDepsInstallPrompt();
    if (depsInstall) {
      await runDepsInstall(projectPath);
    }
  }
})();