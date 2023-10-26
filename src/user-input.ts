import {
  Contract,
  CONTRACTS,
  Frontend,
  FRONTENDS,
  ProjectName,
  TESTING_FRAMEWORKS,
  TestingFramework,
  UserConfig
} from './types';
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
    && FRONTENDS.includes(frontend)
    && CONTRACTS.includes(contract)
    && TESTING_FRAMEWORKS.includes(tests);

  if (hasNoArgs) {
    return 'none';
  } else if (hasAllArgs && optionsAreValid) {
    return 'ok';
  } else {
    return 'error';
  }
}

type Choices<T> = {title: string, description?: string, value: T}[];
const contractChoices: Choices<Contract> = [
  {title: 'Yes, in TypeScript', description: 'Build a Near contract using javascript/typescript', value: 'js'},
  {title: 'Yes, in Rust', description: 'Build a Near contract using Rust' , value: 'rust'},
  {title: 'No', description: 'You are not building a Near smart contract' , value: 'none'},
];
const testsChoices: Choices<TestingFramework> = [
  {title: 'Tests written in Rust', value: 'rust'},
  {title: 'Tests written in Javascript', value: 'js'},
];
const frontendChoices: Choices<Frontend> = [
  {title: 'Composable web app (Gateway)' , description:'Leverage next.js and web3 components to create multi-chain apps', value: 'gateway'},
  {title: 'Vanilla web app', description:'Interact with the Near blockchain using a simple web app' , value: 'vanilla'},
  {title: 'No frontend', description:'Build a smart contract with no frontend', value: 'none'},
];
const userPrompts: PromptObject[] = [
  {
    type: 'select',
    name: 'frontend',
    message: 'Frontend: What kind of App are you building?',
    choices: frontendChoices,
  },
  {
    type: 'select',
    name: 'contract',
    message: 'Contract: Are you building a NEAR contract?',
    choices: contractChoices,
  },
  {
    type: prev => prev === 'rust' ? 'select' : null,
    name: 'tests',
    message: 'Sandbox Testing: Which language do you prefer to test your contract?',
    choices: testsChoices,
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'Name your project (this will create a directory with that name)',
    initial: 'hello-near',
  },
  {
    type: 'confirm',
    name: 'install',
    message: chalk`Run {bold {blue 'npm install'}} now?`,
    initial: true,
  },
];

export async function getUserAnswers() {
  const answers = await prompt(userPrompts);
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
    return null;
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
  // If dir exists warn and exit
  if (fs.existsSync(path)) {
    show.directoryExists(path);
    return null;
  }
  return {config, projectPath: path, isFromPrompts};
}

export const projectPath = (projectName: ProjectName) => `${process.cwd()}/${projectName}`;
