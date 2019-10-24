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

const newProject = {
    command: '$0 [projectDir]',
    desc: 'create a new blank project',
    builder: (yargs) => yargs
      .option('projectDir', {
        desc: 'project directory',
        type: 'string',
        default: '.'
      }),
    handler: (argv) => exitOnError(new_Project(argv))
};

const new_Project = async function(options) {
    // Need to wait for the copy to finish, otherwise next tasks do not find files.
    const projectDir = options.projectDir;
    const sourceDir = __dirname + '/blank_project';
    console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceDir}).`);
    const copyDirFn = () => {
        return new Promise(resolve => {
            ncp (sourceDir, options.projectDir, response => resolve(response));
        });};
    await copyDirFn();
    console.log('Copying project files complete.');
};

yargs.command(newProject).help().argv;