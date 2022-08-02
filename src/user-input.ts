import {ProjectName, UserConfig} from './types';
import chalk from 'chalk';
import prompt, {PromptObject} from 'prompts';
import {program} from 'commander';
import * as show from './messages';
import semver from 'semver';
import {trackUsage} from './tracking';
import fs from 'fs';

export async function getUserArgs(): Promise<UserConfig> {
  program
    .argument('[projectName]')
    .option('--contract <contract>')
    .option('--frontend <frontend>')
    .option('--tests <tests>')
    .option('--install');


  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const {contract, frontend, tests, install} = options;
  return {contract, frontend, projectName, tests, install};
}

export function validateUserArgs(args: UserConfig): 'error' | 'ok' | 'none' {
  if (args === null) {
    return 'error';
  }
  const {projectName, contract, frontend, tests} = args;
  const hasAllOptions = contract !== undefined && frontend !== undefined;
  const hasPartialOptions = contract !== undefined || frontend !== undefined;
  const hasProjectName = projectName !== undefined;
  const hasAllArgs = hasAllOptions && hasProjectName;
  const hasNoArgs = !hasPartialOptions && !hasProjectName;
  const optionsAreValid = hasAllOptions
    && ['react', 'vanilla', 'none'].includes(frontend)
    && ['js', 'rust', 'assemblyscript'].includes(contract)
    && ['js', 'rust'].includes(tests);

  if (hasNoArgs) {
    return 'none';
  } else if (hasAllArgs && optionsAreValid) {
    return 'ok';
  } else {
    return 'error';
  }
}

const userPrompts: PromptObject[] = [
  {
    type: 'select',
    name: 'contract',
    message: 'Select your smart-contract language',
    choices: [
      {title: 'JavaScript', value: 'js'},
      {title: 'Rust', value: 'rust'},
      {title: 'AssemblyScript', value: 'assemblyscript'},
    ]
  },
  {
    type: prev => prev === 'rust' ? 'select' : null,
    name: 'tests',
    message: 'Select language for Sandbox Test',
    choices: [
      {title: 'Rust Sandbox Tests', value: 'rust'},
      {title: 'JavaScript Sandbox Tests', value: 'js'},
    ]
  },
  {
    type: 'select',
    name: 'frontend',
    message: 'Select a template for your frontend',
    choices: [
      {title: 'React.js', value: 'react'},
      {title: 'Vanilla JavaScript', value: 'vanilla'},
      {title: 'No frontend', value: 'none'},
    ]
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Name your project (this will create a directory with that name)',
    initial: 'hello-near',
  },
];

export async function getUserAnswers() {
  const [contract, frontend, tests, projectName] = userPrompts;

  const answers = await prompt([contract, frontend, tests, projectName]);
  if (!answers.tests) {
    answers.tests = answers.contract !== 'rust' ? 'js' : 'rust';
  }
  return answers;
}

export async function showProjectNamePrompt() {
  const [, , , projectName] = userPrompts;
  const answers = await prompt([projectName]);
  return answers;
}

export async function showDepsInstallPrompt() {
  const questions: PromptObject[] = [
    {
      type: 'toggle',
      name: 'depsInstall',
      // message: chalk`One last thing:\n  There are few package.json files with dependencies. We can run {bold {blue 'yarn install'}} for you.\n  Run {bold {blue 'yarn install'}} now? (To do it yourself: {blue 'yarn run deps-install'}).\n  \n`,
      message: chalk`Run {bold {blue 'npm install'}} now in all folders? (To do it yourself: {blue 'npm run deps-install'}).\n`,
      initial: true,
      active: 'yes',
      inactive: 'no'
    },
  ];

  const answers = await prompt(questions);
  return answers;
}

export function userAnswersAreValid(answers: Partial<UserConfig>): answers is UserConfig {
  const {contract, frontend, projectName, tests} = answers;
  if ([contract, frontend, projectName, tests].includes(undefined)) {
    return false;
  } else {
    return true;
  }
}

export async function promptAndGetConfig(): Promise<{ config: UserConfig, projectPath: string, isFromPrompts: boolean } | null> {
  let config: UserConfig | null = null;
  let isFromPrompts = false;
  // process cli args
  const args = await getUserArgs();
  const {install} = args;
  const argsValid = validateUserArgs(args);
  if (argsValid === 'error') {
    show.argsError();
    return null;
  } else if (argsValid === 'ok') {
    config = args as UserConfig;
  }

  show.welcome();

  const nodeVersion = process.version;
  const supportedNodeVersion = require('../package.json').engines.node;
  if (!semver.satisfies(nodeVersion, supportedNodeVersion)) {
    show.unsupportedNodeVersion(supportedNodeVersion);
    // TODO: track unsupported versions
    return null;
  }

  if (process.platform === 'win32') {
    // TODO: track windows
    show.windowsWarning();
  }

  // Get user input
  if (config === null) {
    const userInput = await getUserAnswers();
    isFromPrompts = true;
    if (!userAnswersAreValid(userInput)) {
      throw new Error(`Invalid prompt. ${JSON.stringify(userInput)}`);
    }
    config = userInput;
  }
  const {frontend, contract} = config as UserConfig;
  trackUsage(frontend, contract);

  let path = projectPath(config.projectName);
  // If dir exists keep asking user
  if (fs.existsSync(path)) {
    if (!isFromPrompts) {
      show.directoryExists(path);
      return null;
    } else {
      while (fs.existsSync(path)) {
        show.directoryExists(path);
        const {projectName: newProjectName} = await showProjectNamePrompt();
        config.projectName = newProjectName;
      }
    }
  }
  return {config: {...config, install}, projectPath: path, isFromPrompts};
}

export const projectPath = (projectName: ProjectName) => `${process.cwd()}/${projectName}`;
