#!/usr/bin/env node
const yargs = require('yargs');
const { basename, resolve } = require('path');
const replaceInFiles = require('replace-in-files');
const ncp = require('ncp').ncp;
ncp.limit = 16;
const fs = require('fs');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const which = require('which');

const exitOnError = async function(promise) {
    try {
        await promise;
    } catch (e) {
        console.log('Error: ', e);
        process.exit(1);
    }
};

const createProject = {
    command: '$0 <projectDir>',
    desc: 'create a new blank react project',
    builder: (yargs) => yargs
        .option('projectDir', {
            desc: 'project directory',
            type: 'string',
            required: true
        }),
    handler: (argv) => exitOnError(doCreateProject(argv))
};

const renameFile = async function(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            console.log(`Renamed ${oldPath} to ${newPath}`);
            resolve();
        });    
    });
};

const doCreateProject = async function(options) {
    const rustPiece = options.rust ? '_rust' : '';
    const reactPiece = options.vanilla ? '' : '_react';
    const templateDir = `/blank${rustPiece}${reactPiece}_project`;
    const projectDir = options.projectDir;
    const sourceTemplateDir = __dirname + templateDir;

    console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceTemplateDir}).`);
    // Need to wait for the copy to finish, otherwise next tasks do not find files.
    const copyDirFn = (source, dest) => {
        return new Promise((resolve, reject) => {
            ncp(source, dest, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    };
    await copyDirFn(sourceTemplateDir, projectDir);

    let projectName = basename(resolve(projectDir));

    await replaceInFiles({
        files: [
            // NOTE: These can use globs if necessary later
            `${projectDir}/package.json`,
            `${projectDir}/src/config.js`,
        ],
        from: 'near-blank-project',
        to: projectName
    });

    // copy contract
    const contractTargetDir = `${projectDir}/${options.rust? 'contract' : 'assembly'}`;
    const contractSourceDir = `${__dirname}/contract/${options.rust? 'rust' : 'asc'}`;
    console.log(`Copying contract files to new project directory (${contractTargetDir}) from source (${contractSourceDir}).`);
    const copyContractDirFn = () => {
        return new Promise(resolve => {
            ncp(contractSourceDir, contractTargetDir, response => resolve(response));
        });
    };
    await copyContractDirFn();

    await renameFile(`${projectDir}/near.gitignore`, `${projectDir}/.gitignore`);
    console.log('Copying project files complete.\n');

    const hasNpm = await which('npm', { nothrow: true });
    const hasYarn = await which('yarn', { nothrow: true });

    if (hasNpm || hasYarn) {
        console.log('Installing project dependencies...');
        spawn.sync(hasYarn ? 'yarn' : 'npm', ['install'], { cwd: projectDir, stdio: 'inherit' });
    }

    const runCommand = hasYarn ? 'yarn' : 'npm run';

    console.log(chalk`
Success! Created ${projectDir}
Inside that directory, you can run several commands:

  {bold ${runCommand} dev}
    Starts the development server. Both contract and client-side code will
    auto-reload once you change source files.

  {bold ${runCommand} test}
    Starts the test runner.

  {bold ${runCommand} deploy}
    Deploys contract in permanent location (as configured in {bold src/config.js}).
    Also deploys web frontend using GitHub Pages.
    Consult with {bold README.md} for details on how to deploy and {bold package.json} for full list of commands.

We suggest that you begin by typing:

  {bold cd ${projectDir}}
  {bold ${runCommand} dev}

Happy hacking!
`);
};

yargs
    .option('vanilla',{
        desc: 'create blank plain JS project',
        type: 'boolean',
        default: false
    })
    .option('rust',{
        desc: 'use rust for smart contract',
        type: 'boolean',
        default: false
    })
    .command(createProject)
    .help()
    .argv;
