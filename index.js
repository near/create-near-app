// #!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const { createProject } = require('./scaffold/make');
const mixpanel = require('./scaffold/tracking');
const semver = require('semver');
const { getUserInput } = require('./scaffold/user-input');

const SETUP_FAILED_MSG = (chalk`{bold {red ==========================================}}
{bold {red There was a problem during NEAR project setup}}.
Please refer to https://github.com/near/create-near-app README for troubleshoot.
Notice: some platforms aren't supported (yet).
{bold {red ==========================================}}`);

const SETUP_SUCCESS_MSG = projectName => (chalk`{bold {green Success!} Created ${projectName}}
Check {bold ${projectName}/{green README.md}} to get started.
Happy Hacking!`);

// Execute the tool
(async function run() {
  
  // Check they have the right node.js version
  const current = process.version;
  const supported = require('./package.json').engines.node;
  
  if (!semver.satisfies(current, supported)) {
    console.log(chalk.red(`We support node.js version ${supported} or later`));
    return;
  }

  // Get and track the user input
  const {contract, frontend, projectName} = await getUserInput();
  mixpanel.track(frontend, contract);

  // Make sure the project folder does not exist
  const dirName = `${process.cwd()}/${projectName}`;
  if (fs.existsSync(dirName)) {
    console.log(chalk.red(`This directory already exists! ${dirName}`));
    return;
  }

  // Check if sandbox is supported (this line is literally the check that sandbox makes)
  const supportsSandbox = (os.type() === 'Linux' || os.type() === 'Darwin') && os.arch() === 'x64';

  // Create the project
  let createdSuccessful;
  try {
    createdSuccessful = await createProject({
      contract,
      frontend,
      projectName,
      supportsSandbox,
      verbose: false,
      rootDir: __dirname,
      projectPath: path.resolve(__dirname, projectName),
    });
  } catch(e) {
    createdSuccessful = false;
  }

  if(createdSuccessful){
    console.log(SETUP_SUCCESS_MSG(projectName));
  }else{
    console.log(SETUP_FAILED_MSG);
  }
})();