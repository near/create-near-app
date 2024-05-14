import {
  App,
  Contract,
  CONTRACTS,
  Frontend,
  FRONTENDS,
  ProjectName,
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
    .option('--frontend [next-page|next-app|none]')
    .option('--contract [ts|rs|none]')
    .option('--install')
    .addHelpText('after', 'You can create a frontend or a contract with tests');

  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { contract, frontend, install } = options;
  return { contract, frontend, components: false, projectName, install };
}

type Choices<T> = { title: string, description?: string, value: T }[];

const appChoices: Choices<App> = [
  { title: 'A Web App', description: 'A Web App that talks with Near contracts', value: 'gateway' },
  { title: 'A Smart Contract', description: 'A smart contract to be deployed in the Near Blockchain', value: 'contract' },
];
const contractChoices: Choices<Contract> = [
  { title: 'JS/TS Contract', description: 'A Near contract written in javascript/typescript', value: 'ts' },
  { title: 'Rust Contract', description: 'A Near contract written in Rust', value: 'rs' },
];

const frontendChoices: Choices<Frontend> = [
  { title: 'NextJs (Classic)', description: 'A web-app built using Next.js Page Router', value: 'next-page' },
  { title: 'NextJS (App Router)', description: 'A web-app built using Next.js new App Router', value: 'next-app' },
];

const componentChoices: Choices<Boolean> = [
  { title: 'No', value: false },
  { title: 'Yes', value: true },
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
  message: 'Select a framework for your frontend',
  choices: frontendChoices,
};

const componentsPrompt: PromptObject = {
  type: 'select',
  name: 'components',
  message: 'Are you planning in using on-chain NEAR Components (aka BOS Components)?',
  choices: componentChoices,
};

const contractPrompt: PromptObject[] = [
  {
    type: 'select',
    name: 'contract',
    message: 'Select a smart contract template for your project',
    choices: contractChoices,
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
    const { frontend, components, projectName, install } = await promptUser([frontendPrompt, componentsPrompt, namePrompts, npmPrompt]);
    return { frontend, components, contract: 'none', projectName, install };
  } else {
    // If contract, ask for the language for the contract
    let { contract } = await promptUser(contractPrompt);

    const { projectName } = await promptUser(namePrompts);
    const install = contract === 'ts' ? (await promptUser(npmPrompt)).install as boolean : false;
    return { frontend: 'none', components: false, contract, projectName, install };
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

  if (!validateUserArgs(args)) return;

  // track user input
  const { frontend, components, contract } = args;
  trackUsage(frontend, components, contract);

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

  if (!args.projectName) {
    show.argsError('Please provide a project name');
    return false;
  }

  if ((args.contract === 'none') === (args.frontend === 'none')) {
    show.argsError('Please create a contract OR a frontend');
    return false;
  }

  return true;
};