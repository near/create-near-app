const fs = require('fs');
const {ncp} = require('ncp');
const path = require('path');
const {buildPackageJson} = require('./package-json');
const {checkWorkspacesSupport} = require('./checks');

ncp.limit = 16;

async function make({
  contract,
  frontend,
  projectName,
  verbose,
  rootDir,
  projectPath,
}) {
  await createFiles({
    contract,
    frontend,
    projectName,
    verbose,
    rootDir,
    projectPath,
  });

  const packageJson = buildPackageJson({
    contract,
    frontend,
    projectName,
    workspacesSupported: checkWorkspacesSupport()
  });
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));
}

async function createFiles({contract, frontend, projectName, projectPath, verbose, rootDir}) {
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
  let sourceTestDir = rootDir + '/integration-tests/tests';
  if (checkWorkspacesSupport()) {
    if (contract === 'rust') {
      sourceTestDir = rootDir + '/integration-tests/workspaces-rs-tests';
    } else {
      sourceTestDir = rootDir + '/integration-tests/workspaces-js-tests';
    }
  }
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
exports.make = make;