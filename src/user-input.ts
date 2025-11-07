import {
  App,
  Contract,
  CONTRACTS,
  Template,
  TEMPLATES,
  Frontend,
  FRONTENDS,
  ProjectName,
  UserConfig
} from './types';
import chalk from 'chalk';
import prompt, { PromptObject } from 'prompts';
import { program } from 'commander';
import * as show from './messages';
import { trackUsage } from './tracking';
import fs from 'fs';

export async function getUserArgs(): Promise<UserConfig> {
  program
    .argument('[projectName]')
    .option('--frontend [next-page|next-app|vite-react|none]')
    .option('--contract [ts|rs|none]')
    .option('--template [auction-adv|auction]')
    .option('--install')
    .addHelpText('after', 'You can create a frontend or a contract with tests');

  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { contract, frontend, template, install } = options;
  return { contract, frontend, template, projectName, install, error: undefined };
}

type Choices<T> = { title: string, description?: string, value: T }[];

const appChoices: Choices<App> = [
  { title: 'A Web App', description: 'A Web App that talks with Near contracts', value: 'gateway' },
  {
    title: 'A Smart Contract', description: 'A smart contract to be deployed in the Near Blockchain', value: 'contract',
  },
];

const templateChoices: Choices<Template> = [
  { title: 'Auction', description: 'A simple auction smart contract', value: 'auction' },
  { title: 'Auction (advance)', description: 'An auction contract were users can bid with FT and the winner gets a NFT', value: 'auction-adv' },
];

const contractChoices: Choices<Contract> = [
  { title: 'TS Contract', description: 'A Near contract written in typescript', value: 'ts' },
  { title: 'Rust Contract', description: 'A Near contract written in Rust', value: 'rs' },
];

const frontendChoices: Choices<Frontend> = [
  { title: 'NextJs (Classic)', description: 'A web-app built using Next.js Page Router', value: 'next-page' },
  { title: 'NextJS (App Router)', description: 'A web-app built using Next.js new App Router', value: 'next-app' },
  { title: 'Vite (React)', description: 'A web-app built using Vite with React', value: 'vite-react' },
];

const appPrompt: PromptObject = {
  type: 'select',
  name: 'app',
  message: 'What do you want to build?',
  choices: appChoices,
};

const templatePrompt: PromptObject = {
  type: 'select',
  name: 'template',
  message: 'Select a contract template',
  choices: templateChoices,
};

const frontendPrompt: PromptObject = {
  type: 'select',
  name: 'frontend',
  message: 'Select a framework for your frontend',
  choices: frontendChoices,
};

const contractPrompt: PromptObject[] = [
  {
    type: 'select',
    name: 'contract',
    message: 'Select a language for your contract',
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
    const { frontend, projectName, install } = await promptUser([frontendPrompt, namePrompts, npmPrompt]);
    return { frontend, contract: 'none', projectName, install, error: undefined };
  } else {
    // If platform is Window, return the error
    if (process.platform === 'win32') {
      return { frontend: 'none', contract: 'none', projectName: '', install: false, error: show.windowsWarning };
    }

    // If contract, ask for the template and language
    const { template } = await promptUser(templatePrompt);
    let { contract } = await promptUser(contractPrompt);

    const { projectName } = await promptUser(namePrompts);
    const install = contract === 'ts' ? (await promptUser(npmPrompt)).install as boolean : false;
    return { frontend: 'none', contract, template, projectName, install, error: undefined };
  }
}

export async function promptAndGetConfig(): Promise<{ config: UserConfig, projectPath: string } | void> {

  // process cli args
  let args = await getUserArgs();

  // If no args, prompt user
  if (!args.projectName) {
    show.welcome();
    args = await getUserAnswers();
  }

  if (args.error) {
    trackUsage('none', 'none');
    return args.error();
  }

  // Homogenizing terminal args with prompt args
  args.contract = args.contract || 'none';
  args.frontend = args.frontend || 'none';

  if (!validateUserArgs(args)) return;

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

const validateUserArgs = (args: UserConfig) => {

  if (!FRONTENDS.includes(args.frontend)) {
    show.argsError(`Invalid frontend type: ${args.frontend}`);
    return false;
  }

  if (!CONTRACTS.includes(args.contract)) {
    show.argsError(`Invalid contract type: ${args.contract}`);
    return false;
  }

  if (args.template && !TEMPLATES.includes(args.template)) {
    show.argsError(`Invalid template type: ${args.template}`);
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

  if (args.contract !== 'none' && !args.template) {
    show.argsError('Please specify a template for your contract');
    return false;
  }

  return true;
};