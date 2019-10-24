#!/usr/bin/env node
const yargs = require('yargs');
const ncp = require('ncp').ncp;
ncp.limit = 16;

const exitOnError = async function(promise) {
  try {
    await promise;
  } catch (e) {
    console.log("Error: ", e);
    process.exit(1);
  }
}

const reactProject = {
    command: '$0 [projectDir]',
    desc: 'create a new blank react project',
    builder: (yargs) => yargs
      .option('projectDir', {
        desc: 'project directory',
        type: 'string',
        default: '.'
      }),
    handler: (argv) => exitOnError(react_Project(argv))
  };

const react_Project = async function(options) {
    // Need to wait for the copy to finish, otherwise next tasks do not find files.
    const projectDir = options.projectDir;
    const sourceDir = __dirname + "/blank_react_project";
    console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceDir}).`);
    const copyDirFn = () => {
        return new Promise(resolve => {
            ncp (sourceDir, options.projectDir, response => resolve(response));
    })};
    await copyDirFn();
    console.log('Copying project files complete.')
  };

  yargs.command(reactProject).help().argv;