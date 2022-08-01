import path from 'path';
import fs from 'fs';
import {createProject, runDepsInstall} from './make';
import {trackUsage} from './tracking';
import semver from 'semver';
import {
  getUserArgs,
  showDepsInstallPrompt, showProjectNamePrompt,
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
  let {install} = args;
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
  const {frontend, contract, tests, projectName} = config as UserConfig;
  trackUsage(frontend, contract);

  let projectPath = `${process.cwd()}/${projectName}`;
  // If dir exists keep asking user
  if (fs.existsSync(projectPath)) {
    if (!configIsFromPrompts) {
      show.directoryExists(projectPath);
      return;
    } else {
      while (fs.existsSync(projectPath)) {
        show.directoryExists(projectPath);
        const {projectName: newProjectName} = await showProjectNamePrompt();
        projectPath = `${process.cwd()}/${newProjectName}`;
      }
    }
  }

  // Create the project
  let createSuccess;
  try {
    createSuccess = await createProject({
      contract,
      frontend,
      tests,
      projectName,
      verbose: false,
      rootDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
  } catch (e) {
    console.error(e);
    createSuccess = false;
  }

  if (createSuccess) {
    show.setupSuccess(projectPath, contract, frontend, tests);
  } else {
    show.setupFailed();
    return;
  }
  if (install) {
    await runDepsInstall(projectPath);
  } else if (configIsFromPrompts) {
    const {depsInstall} = await showDepsInstallPrompt();
    if (depsInstall) {
      await runDepsInstall(projectPath);
    }
  }
})();