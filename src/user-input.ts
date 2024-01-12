import {
  App,
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
import prompt, { PromptObject } from 'prompts';
import { program } from 'commander';
import * as show from './messages';
import semver from 'semver';
import { trackUsage } from './tracking';
import fs from 'fs';

export async function getUserArgs(): Promise<UserConfig> {
  program
    .argument('[projectName]')
    .option('--frontend [next|vanilla|none]')
    .option('--contract [ts|rs|none]')
    .option('--tests [rs|ts|none]')
    .option('--install')
    .addHelpText('after', 'You can create a frontend or a contract with tests');

  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { contract, frontend, tests, install } = options;
  return { contract, frontend, projectName, tests, install };
}

type Choices<T> = { title: string, description?: string, value: T }[];

const appChoices: Choices<App> = [
  { title: 'A Near Gateway (Web App)', description: 'A multi-chain App that talks with Near contracts and Near components', value: 'gateway' },
  { title: 'A Near Smart Contract', description: 'A smart contract to be deployed in the Near Blockchain', value: 'contract' },
];
const contractChoices: Choices<Contract> = [
  { title: 'JS/TS Contract', description: 'A Near contract written in javascript/typescript', value: 'ts' },
  { title: 'Rust Contract', description: 'A Near contract written in Rust', value: 'rs' },
];
const testsChoices: Choices<TestingFramework> = [
  { title: 'Tests written in Rust', value: 'rs' },
  { title: 'Tests written in Typescript', value: 'ts' },
];

const frontendChoices: Choices<Frontend> = [
  { title: 'NextJs (Classic)', description: 'A composable app built using Next.js, React and Near components', value: 'next-page' },
  { title: 'NextJS (App Router)', description: 'A composable app built using Next.js, React and Near components', value: 'next-app' },
  { title: 'Vanilla JS', description: 'A framework-less web app with limited capabilities.', value: 'vanilla' },
];

const appPrompt: PromptObject = {
  type: 'select',
  name: 'app',
  message: 'What do you want to build?',
  choices: appChoices,
};

const frontendPrompt: PromptObject = {
  type: 'select',
  name: 'frontend',
  message: 'Select a framework for your frontend (Gateway)',
  choices: frontendChoices,
};

const contractPrompt: PromptObject[] = [
  {
    type: 'select',
    name: 'contract',
    message: 'Select a smart contract template for your project',
    choices: contractChoices,
  },
  {
    type: prev => prev === 'rs' ? 'select' : null,
    name: 'tests',
    message: 'Sandbox Testing: Which language do you prefer to test your contract?',
    choices: testsChoices,
  }
];

const namePrompts: PromptObject = {
  type: 'text',
  name: 'projectName',
  message: 'Name your project (we will create a directory with that name)',
  initial: 'hello-near',
};

const npmPrompt: PromptObject = {
  type: 'confirm',
  name: 'install',
  message: chalk`Run {bold {blue 'npm install'}} now?`,
  initial: true,
};

const promptUser = async (prompts: PromptObject | PromptObject[]): Promise<prompt.Answers<string>> => {
  // Prompt, and exit if user cancels
  return prompt(prompts, { onCancel: () => process.exit(0) });
};

export async function getUserAnswers(): Promise<UserConfig> {
  // Either the user wants a gateway or a contract
  const { app } = await promptUser(appPrompt);

  if (app === 'gateway') {
    // If gateway, ask for the framework to use
    const { frontend, projectName, install } = await promptUser([frontendPrompt, namePrompts, npmPrompt]);
    return { frontend, contract: 'none', tests: 'none', projectName, install };
  } else {
    // If contract, ask for the language for the contract and tests
    let { contract, tests } = await promptUser(contractPrompt);
    tests = contract === 'ts' ? 'ts' : tests;
    const { projectName } = await promptUser(namePrompts);
    const install = contract === 'ts' ? (await promptUser(npmPrompt)).install as boolean : false;
    return { frontend: 'none', contract, tests, projectName, install };
  }
}

export async function promptAndGetConfig(): Promise<{ config: UserConfig, projectPath: string } | void> {
  const supportedNodeVersion = require('../package.json').engines.node;
  if (!semver.satisfies(process.version, supportedNodeVersion)) {
    return show.unsupportedNodeVersion(supportedNodeVersion);
  }

  if (process.platform === 'win32') {
    return show.windowsWarning();
  }

  // process cli args
  let args = await getUserArgs();

  // If no args, prompt user
  if (!args.projectName) {
    show.welcome();
    args = await getUserAnswers();
  }

  // Homogenizing terminal args with prompt args
  args.contract = args.contract || 'none';
  args.frontend = args.frontend || 'none';
  args.tests = args.tests || 'none';

  if (!validateUserArgs(args)) return;

  // track user input
  const { frontend, contract, tests } = args;
  trackUsage(frontend, contract, tests);

  let path = projectPath(args.projectName);

  if (fs.existsSync(path)) {
    return show.directoryExists(path);
  }

  return { config: args, projectPath: path };
}

export const projectPath = (projectName: ProjectName) => `${process.cwd()}/${projectName}`;

const validateUserArgs = (args: UserConfig) => {

  if (!FRONTENDS.includes(args.frontend)) {
    show.argsError(`Invalid frontend type: ${args.frontend}`);
    return false;
  }

  if (!CONTRACTS.includes(args.contract)) {
    show.argsError(`Invalid contract type: ${args.contract}`);
    return false;
  }

  if (!TESTING_FRAMEWORKS.includes(args.tests)) {
    show.argsError(`Invalid testing framework: ${args.tests}`);
    return false;
  }

  if (!args.projectName) {
    show.argsError('Please provide a project name');
    return false;
  }

  if ((args.contract === 'none') === (args.frontend === 'none')) {
    console.log(args.contract, args.frontend);
    show.argsError('Please create a contract OR a frontend');
    return false;
  }

  if (args.contract !== 'none' && args.tests === 'none') {
    show.argsError('Please select a testing framework for your contract');
    return false;
  }

  if (args.frontend !== 'none' && args.tests !== 'none') {
    show.argsError('Remove the --tests flag when creating a frontend');
    return false;
  }

  if (args.contract === 'ts' && args.tests === 'rs') {
    show.argsError('We currently do not support creating a contract in TS with Rust tests, please create it manually');
    return false;
  }

  return true;
};