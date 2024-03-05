import {
  // App,
  // Frontend,
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
    .option('--install')
    .addHelpText('after', 'You can create a frontend');

  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { install } = options;
  const frontend = 'next-app'
  return {frontend, projectName, install };
}

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
    const { projectName, install } = await promptUser([namePrompts, npmPrompt]);
    const frontend = 'next-app'
    return { frontend, projectName, install };
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
  args.frontend = 'next-app'  //args.frontend || 'none';

  if (!validateUserArgs(args)) return;

  // track user input
  const { frontend } = args;
  trackUsage(frontend);

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

  if (!args.projectName) {
    show.argsError('Please provide a project name');
    return false;
  }

  // if (args.frontend !== 'none') {
  //   show.argsError('Remove the --tests flag when creating a frontend');
  //   return false;
  // }


  return true;
};