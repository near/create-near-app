#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const ncp = require('ncp').ncp;
ncp.limit = 16;

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
    handler: (argv) => exitOnError(create_Project(argv))
};

const create_Project = async function(options) {
    if (!options.vanilla && options.rust) {
      console.log('Blank project for rust contract with react is not available yet.');
      return;
    }
    const rustPiece = options.rust ? '_rust' : '';
    const reactPiece = options.vanilla ? '' : '_react';
    const templateDir = `/blank${rustPiece}${reactPiece}_project`
    // Need to wait for the copy to finish, otherwise next tasks do not find files.
    const projectDir = options.projectDir;
    let sourceDir = __dirname + templateDir;
    console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceDir}).`);
    const copyDirFn = () => {
        return new Promise(resolve => {
            ncp (sourceDir, options.projectDir, response => resolve(response));
        });};
    await copyDirFn();
    let path = projectDir + '/package.json';
    let index = projectDir.lastIndexOf('/');
    let name = index > 0
        ? projectDir.slice(index+1, )
        : projectDir;
    fs.readFile(path,function(err, data){
        if (err) {
            throw 'could not read file: ' + err;
        }
        let json = JSON.parse(data);
        json['name'] = name;
        fs.writeFile(path,JSON.stringify(json, null, 4),function(err) {
            if (err) {
                throw 'error writing file: ' + err;
            }else {
                console.log('wrote successfully!');
            }
        });
    });
    console.log('Copying project files complete.');
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
        default: true
    })
    .command(createProject)
    .help()
    .argv;
