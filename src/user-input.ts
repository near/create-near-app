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
    .option('--contract [ts|rs|none]')
    .option('--frontend [next|vanilla|none]')
    .option('--tests [rs|ts|none]')
    .option('--install')
    .addHelpText('after', 'You can create a frontend or a contract with tests');

  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { contract, frontend, tests, install } = options;
  return { contract, frontend, projectName, tests, install };
}

export function validateUserArgs(args: UserConfig): 'error' | 'ok' | 'none' {
  if (args === null) {
    return 'error';
  }
  const { projectName, contract, frontend, tests } = args;
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
  { title: 'NextJs + React', description: 'A composable app built using Next.js, React and Near components', value: 'next' },
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
    let {contract, tests} = await promptUser(contractPrompt);
    tests = contract === 'ts'? 'ts' : tests;
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

  if( args.contract && (!args.tests || args.frontend) ){
    return show.argsError();
  }

  if( args.frontend && (args.tests || args.contract) ){
    return show.argsError();
  }

  // If no args, prompt user
  if( !args.contract && !args.frontend ){
    show.welcome();
    args = await getUserAnswers();
  }

  // track user input
  const { frontend, contract } = args;
  trackUsage(frontend, contract);

  let path = projectPath(args.projectName);

  if (fs.existsSync(path)) {
    return show.directoryExists(path);
  }

  return { config: args, projectPath: path };
}

export const projectPath = (projectName: ProjectName) => `${process.cwd()}/${projectName}`;
