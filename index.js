#!/usr/bin/env node
const fs = require('fs');
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
  // Need to wait for the copy to finish, otherwise next tasks do not find files.
  const projectDir = options.projectDir;
  let sourceDir = __dirname + "/blank_react_project";
  if(options.noReact){
    sourceDir = __dirname + '/blank_project';
  }
  console.log(`Copying files to new project directory (${projectDir}) from template source (${sourceDir}).`);
  const copyDirFn = () => {
      return new Promise(resolve => {
          ncp (sourceDir, options.projectDir, response => resolve(response));
  })};
  await copyDirFn();
  let path = projectDir + "/package.json";
  let index = projectDir.lastIndexOf("/");
  let name = index > 0 
            ? projectDir.slice(index+1, ) 
            : projectDir
  fs.readFile(path,function(err, data){
    if (err) {
      throw 'could not read file: ' + err;
    }
    let json = JSON.parse(data);
    json["name"] = name;
    fs.writeFile(path,JSON.stringify(json, null, 4),function(err) {
      if (err) { 
        throw "error writing file: " + err;
      }else {
        console.log("wrote successfully!");
      }
    })
  })
  console.log('Copying project files complete.');
};

yargs
  .option('noReact',{
    desc: 'create blank plain JS project',
    type: 'boolean',
    default: false
  })
  .alias({
    'noReact': ['no_react']
  })
  .command(createProject)
  .help()
  .argv;