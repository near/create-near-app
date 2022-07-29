import path from 'path';
import fs from 'fs';
import {createProject, runDepsInstall} from './make';
import {trackUsage} from './tracking';
import semver from 'semver';
import {
  getUserArgs,
  showDepsInstallPrompt,
  showUserPrompts,
  userAnswersAreValid,
  validateUserArgs,
} from './user-input';
import {UserConfig} from './types';
import {show} from './messages';

(async function run() {
  let config: UserConfig | null = null;
  let configIsFromPrompts = false;
  const args = await getUserArgs();
  const argsValid = validateUserArgs(args);
  if (argsValid === 'error') {
    show.argsError();
    return;
  } else if (argsValid === 'ok') {
    config = args as UserConfig;
  }

  show.welcome();

  // Check node.js version
  const current = process.version;
  const supported = require('../package.json').engines.node;

  if (!semver.satisfies(current, supported)) {
    show.unsupportedNodeVersion(supported);
    // TODO: track unsupported versions
    return;
  }

  // Get user input
  if (config === null) {
    const userInput = await showUserPrompts();
    configIsFromPrompts = true;
    if (!userAnswersAreValid(userInput)) {
      throw new Error(`Invalid prompt. ${JSON.stringify(userInput)}`);
    }
    config = userInput;
  }
  const {frontend, contract, projectName} = config as UserConfig;
  trackUsage(frontend, contract);

  // Make sure the project folder does not exist
  const dirName = `${process.cwd()}/${projectName}`;
  if (fs.existsSync(dirName)) {
    show.directoryExists(dirName);
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
    show.setupSuccess(projectName, contract, frontend);
  }else{
    show.setupFailed();
    return;
  }
  if (configIsFromPrompts) {
    const { depsInstall } = await showDepsInstallPrompt();
    if (depsInstall) {
      await runDepsInstall(projectPath);
    }
  }
})();