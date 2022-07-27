const fs = require('fs');
const {ncp} = require('ncp');
const chalk = require('chalk');
const path = require('path');
const {preMessage, postMessage} = require('./checks');
const {buildPackageJson} = require('./package-json');

ncp.limit = 16;

// Method to create the project folder
async function createProject(settings) {
  // Make language specific checks
  let preMessagePass = preMessage(settings);
  if(!preMessagePass){
    return false;
  }

  console.log(chalk`Creating a new NEAR app.`);

  // Create relevant files in the project folder
  await createFiles(settings);

  // Create package settings and dump them as a .json
  const packageJson = buildPackageJson(settings);
  fs.writeFileSync(path.resolve(settings.projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));

  // Run any language-specific post check
  postMessage(settings);

  // Finished!
  return true;
}

async function createFiles({contract, frontend, projectPath, verbose, rootDir, supportsSandbox}) {
  // skip build artifacts and symlinks
  const skip = ['.cache', 'dist', 'out', 'node_modules', 'yarn.lock', 'package-lock.json'];

  // copy frontend
  if (frontend !== 'none') {
    const sourceTemplateDir = rootDir + `/templates/${frontend}`;
    await copyDir(sourceTemplateDir, projectPath, {verbose, skip: skip.map(f => path.join(sourceTemplateDir, f))});
  }

  // shared files
  const sourceSharedDir = rootDir + '/templates/shared';
  await copyDir(sourceSharedDir, projectPath, {verbose, skip: skip.map(f => path.join(sourceSharedDir, f))});

  // copy contract files
  const contractSourceDir = `${rootDir}/contracts/${contract}`;
  await copyDir(contractSourceDir, `${projectPath}/contract`, {
    verbose,
    skip: skip.map(f => path.join(contractSourceDir, f))
  });

  // copy tests
  let testFramework = supportsSandbox ? 'workspaces-tests' : 'classic-tests';
  let sourceTestDir = `${rootDir}/integration-tests/${testFramework}`;
  await copyDir(sourceTestDir, `${projectPath}/integration-tests/`, {
    verbose,
    skip: skip.map(f => path.join(sourceTestDir, f))
  });

  // add .gitignore
  await renameFile(`${projectPath}/near.gitignore`, `${projectPath}/.gitignore`);
}

const renameFile = async function (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve();
    });
  });
};

// Wrap `ncp` tool to wait for the copy to finish when using `await`
// Allow passing `skip` variable to skip copying an array of filenames
function copyDir(source, dest, {skip, verbose} = {}) {
  return new Promise((resolve, reject) => {
    const copied = [];
    const skipped = [];
    const filter = skip && function (filename) {
      const shouldCopy = !skip.find(f => filename.includes(f));
      shouldCopy ? copied.push(filename) : skipped.push(filename);
      return !skip.find(f => filename.includes(f));
    };

    ncp(source, dest, {filter}, (err) => {
      if (err) return reject(err);

      if (verbose) {
        console.log('Copied:');
        copied.forEach(f => console.log('  ' + f));
        console.log('Skipped:');
        skipped.forEach(f => console.log('  ' + f));
      }

      resolve();
    });
  });
}

exports.renameFile = renameFile;
exports.copyDir = copyDir;
exports.createProject = createProject;