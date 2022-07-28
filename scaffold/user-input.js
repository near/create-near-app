const chalk = require('chalk');
const prompt = require('prompts');
const { program } = require('commander');

async function getUserArgs() {
  program
    .argument('[projectName]')
    .option('--contract <contract>')
    .option('--frontend <frontend>');


  program.parse();

  const options = program.opts();
  const [projectName] = program.args;
  const { contract, frontend } = options;
  const hasAllOptions = contract !== undefined && frontend !== undefined;
  const hasPartialOptions = contract !== undefined || frontend !== undefined;
  const hasProjectName = projectName !== undefined;
  const hasAllArgs = hasAllOptions && hasProjectName;
  const hasNoArgs = !hasPartialOptions && !hasProjectName;
  const optionsAreValid = hasAllOptions
    && ['react', 'vanilla', 'none'].includes(frontend)
    && ['js', 'rust', 'assemblyscript'].includes(contract);

  if (hasNoArgs) {
    return null;
  } else if (hasAllArgs && optionsAreValid) {
    return { contract, frontend, projectName };
  } else {
    throw new Error('Bad arguments');
  }
}

async function showUserPrompts() {
  const questions = [
    {
      type: 'select',
      name: 'contract',
      message: 'Select your smart-contract language',
      choices: [
        { title: 'JavaScript', value: 'js' },
        { title: 'Rust', value: 'rust' },
        { title: 'AssemblyScript', value: 'assemblyscript' },
      ]
    },
    {
      type: 'select',
      name: 'frontend',
      message: 'Select a template for your frontend',
      choices: [
        { title: 'React.js', value: 'react' },
        { title: 'Vanilla JavaScript', value: 'vanilla' },
        { title: 'No frontend', value: 'none' },
      ]
    },
    {
      type: 'text',
      name: 'projectName',
      message: 'Name your project (this will create a directory with that name)}',
      initial: 'my-near-project',
      format: v => `${v}`
    },
  ];

  const answers = await prompt(questions);
  return answers;
}

async function showDepsInstallPrompt() {
  const questions = [
    {
      type: 'toggle',
      name: 'depsInstall',
      message: chalk`One last thing: we can run {bold {blue 'npm install'}} for you in a few directories.\n  To do it yourself: {bold {blue 'npm run deps-install'}}.\n  Run {bold {blue 'npm install'}} now?\n`,
      initial: true,
      active: 'yes',
      inactive: 'no'
    },
  ];

  const answers = await prompt(questions);
  return answers;
}

function userAnswersAreValid(answers) {
  const { contract, frontend, projectName } = answers;
  if ([contract, frontend, projectName].includes(undefined)) {
    return false;
  } else {
    return true;
  }
}


exports.showUserPrompts = showUserPrompts;
exports.getUserArgs = getUserArgs;
exports.userAnswersAreValid = userAnswersAreValid;
exports.showDepsInstallPrompt = showDepsInstallPrompt;