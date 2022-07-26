// #!/usr/bin/env node
const path = require('path');
const prompt = require('prompts');
const chalk = require('chalk');
const {make} = require('./scaffold/make');
const mixpanel = require('./scaffold/tracking');
const {
  checkPrerequisites,
  checkUserInput,
} = require('./scaffold/checks');


const createProject = async function ({contract, frontend, projectName, verbose}) {
  mixpanel.track(frontend, contract);

  console.log(chalk`Creating a new NEAR app.`);

  try {
    await make({
      contract,
      frontend,
      projectName,
      verbose,
      rootDir: __dirname,
      projectPath: path.resolve(__dirname, projectName),
    });
  } catch (e) {
    console.log(chalk`{bold {red ==========================================}}
{bold {red NEAR project setup failed}}.
Please refer to https://github.com/near/create-near-app README for troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);
    return;
  }

  // print success message
  console.log(chalk`
{bold {green Success! Created ${projectName}}}

See the README to get started!`);

  if (contract === 'rust') {
    console.log(chalk`
{bold {green To get started with Rust visit https://www.rust-lang.org/}}
    `);
  }
  console.log(chalk`Happy hacking!`);
};

async function getUserInput() {
  const questions = [
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
      initial: 'my-near-project',
      format: v => `${v}`
    },
  ];

  const answers = await prompt(questions);
  return answers;
}

(async function run() {
  const prerequisitesOk = checkPrerequisites();
  if (!prerequisitesOk) {
    return;
  }
  const userInput = await getUserInput();
  const userInputOk = await checkUserInput(userInput);
  if (!userInputOk) {
    return;
  }
  createProject(userInput);
})();
