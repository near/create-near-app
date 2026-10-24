import { Template, TEMPLATES, Frontend, FRONTENDS, ProjectName, UserConfig } from './types';
import chalkTemplate from 'chalk-template';
import prompt, { PromptObject } from 'prompts';
import { Command, Option } from 'commander';
import * as show from './messages';
import { trackUsage } from './tracking';
import fs from 'fs';
import path from 'path';

export async function getUserArgs(): Promise<UserConfig> {
  const program = new Command()
    .argument('[projectName]')
    .allowExcessArguments(false)
    .addOption(new Option('--frontend <framework>', 'Create a frontend').choices(FRONTENDS))
    .option('--contract', 'Create a Rust smart contract')
    .addOption(new Option('--template <template>', 'Choose a Rust contract template').choices(TEMPLATES))
    .option('--install', 'Install frontend dependencies')
    .addHelpText('after', 'Create a Rust contract with --contract, or a frontend with --frontend next-app|vite-react.');

  program.parse();
  const { contract = false, frontend, template, install = false } = program.opts();
  const [projectName] = program.args;
  return { contract, frontend, template, projectName, install };
}

type Choices<T> = { title: string, description?: string, value: T }[];

const templateChoices: Choices<Template> = [
  { title: 'Auction', description: 'Bid using NEAR, ideal for beginners', value: 'auction' },
  { title: 'Auction (with FT)', description: 'Bid using fungible tokens to win an NFT', value: 'auction-adv' },
];

const frontendChoices: Choices<Frontend> = [
  { title: 'Vite (React)', description: 'A React web application built with Vite', value: 'vite-react' },
  { title: 'Next.js (App Router)', description: 'A React web application built with Next.js', value: 'next-app' },
];

const namePrompt: PromptObject = {
  type: 'text',
  name: 'projectName',
  message: 'Name your project (we will create a directory with that name)',
  initial: 'near-template',
};

const promptUser = (questions: PromptObject | PromptObject[]) =>
  prompt(questions, { onCancel: () => process.exit(0) });

export async function getUserAnswers(): Promise<UserConfig> {
  const { app } = await promptUser({
    type: 'select', name: 'app', message: 'What do you want to build?',
    choices: [
      { title: 'Frontend', value: 'frontend' },
      { title: 'Smart Contract', value: 'contract' },
    ],
  });

  if (app === 'contract') {
    const { template, projectName } = await promptUser([
      { type: 'select', name: 'template', message: 'Select a contract template', choices: templateChoices },
      namePrompt,
    ]);
    return { contract: true, template, projectName, install: false };
  }

  const { frontend, projectName, install } = await promptUser([
    { type: 'select', name: 'frontend', message: 'Select a framework for your frontend', choices: frontendChoices },
    namePrompt,
    { type: 'confirm', name: 'install', message: chalkTemplate`Run {bold {blue 'npm install'}} now?`, initial: true },
  ]);
  return { contract: false, frontend, projectName, install };
}

export async function promptAndGetConfig(): Promise<{ config: UserConfig, projectPath: string } | void> {
  let args = await getUserArgs();
  if (!args.projectName) {
    show.welcome();
    args = await getUserAnswers();
  }
  if (!validateUserArgs(args)) return;
  if (args.contract && process.platform === 'win32') return show.windowsWarning();
  if (args.contract) args.template ??= 'auction';

  void trackUsage(args.frontend, args.contract);
  const destination = projectPath(args.projectName);
  if (fs.existsSync(destination)) {
    process.exitCode = 1;
    return show.directoryExists(destination);
  }
  return { config: args, projectPath: destination };
}

export const projectPath = (projectName: ProjectName) => path.resolve(projectName);

export const validateUserArgs = (args: UserConfig): boolean => {
  let error: string | undefined;
  if (args.frontend && !FRONTENDS.includes(args.frontend)) error = `Invalid frontend type: ${args.frontend}`;
  else if (!!args.contract === !!args.frontend) error = 'Please create a contract OR a frontend';
  else if (args.template && !TEMPLATES.includes(args.template)) error = `Invalid template type: ${args.template}`;
  else if (args.template && !args.contract) error = '--template requires --contract';
  else if (args.install && args.contract) error = '--install is only available for frontends';
  else if (!args.projectName) error = 'Please provide a project name';
  if (error) {
    show.argsError(error);
    process.exitCode = 1;
    return false;
  }
  return true;
};
