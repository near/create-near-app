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
const sh = require('shelljs');
const path = require('path');

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
    const contractLang = options.rust ? 'rust' : 'asc';
    const templateDir = `/templates/${options.vanilla ? 'vanilla' : 'react'}`;
    const projectDir = options.projectDir;
    const sourceTemplateDir = __dirname + templateDir;

    console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceTemplateDir}).`);
    // Need to wait for the copy to finish, otherwise next tasks do not find files.
    const copyDirFn = (source, dest, opts = {}) => {
        return new Promise((resolve, reject) => {
            ncp(source, dest, opts, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    };

    // our frontend templates are set up with symlinks for easy development,
    // developing right in these directories also results in build artifacts;
    // we don't want to copy these
    const filesToSkip = [
        'package.json',
        path.join(sourceTemplateDir, 'node_modules'),
        path.join(sourceTemplateDir, 'contract'),
        path.join(sourceTemplateDir, 'assembly'),
        ...sh.ls(`${__dirname}/common/frontend`).map(f => path.join('src', f))
    ];
    const copied = [];
    const skipped = [];
    await copyDirFn(sourceTemplateDir, projectDir, {
        filter: filename => {
            const shouldCopy = !filesToSkip.find(f => filename.includes(f));
            shouldCopy ? copied.push(filename) : skipped.push(filename);
            return !filesToSkip.find(f => filename.includes(f));
        }
    });

    if (options['very-verbose']) {
        console.log('Copied:');
        copied.forEach(f => console.log('  ' + f));
        console.log('Skipped:');
        skipped.forEach(f => console.log('  ' + f));
    }

    // copy contract
    const contractTargetDir = `${projectDir}/${options.rust? 'contract' : 'assembly'}`;
    const contractSourceDir = `${__dirname}/common/contracts/${contractLang}`;
    console.log(`Copying contract files to new project directory (${contractTargetDir}) from source (${contractSourceDir}).`);
    await copyDirFn(contractSourceDir, contractTargetDir);

    // copy common frontend files
    await copyDirFn(`${__dirname}/common/frontend`, `${projectDir}/src`);

    // use correct package.json; delete the other(s)
    await copyDirFn(`${sourceTemplateDir}/packagejsons/${contractLang}/package.json`, `${projectDir}/package.json`);

    // update package name
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

    if (options.rust) {
        await replaceInFiles({ files: `${projectDir}/src/*`, from: /getGreeting/g, to: 'get_greeting' });
        await replaceInFiles({ files: `${projectDir}/src/*`, from: /setGreeting/g, to: 'set_greeting' });
        await replaceInFiles({ files: `${projectDir}/src/*`, from: /assembly\/main.ts/g, to: 'contract/src/lib.rs' });
        await replaceInFiles({ files: `${projectDir}/src/*`, from: /accountId:/g, to: 'account_id:' });
    }

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
    .option('very-verbose', {
        desc: 'turn on very verbose logging',
        type: 'boolean',
        default: false,
        hidden: true,
    })
    .command(createProject)
    .help()
    .argv;
