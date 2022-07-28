import {CreateProjectParams} from './types';

const spawn = require('cross-spawn');
const fs = require('fs');
const {ncp} = require('ncp');
const chalk = require('chalk');
const path = require('path');
const {preMessage, postMessage} = require('./checks');
const {buildPackageJson} = require('./package-json');

ncp.limit = 16;

// Method to create the project folder
export async function createProject({contract, frontend, projectPath, projectName, verbose, rootDir, supportsSandbox}: CreateProjectParams): Promise<boolean> {
  // Make language specific checks
  let preMessagePass = preMessage({contract, frontend, projectPath, verbose, rootDir, supportsSandbox});
  if(!preMessagePass){
    return false;
  }

  console.log(chalk`...creating a new NEAR app...`);

  // Create relevant files in the project folder
  await createFiles({contract, frontend, projectName, projectPath, verbose, rootDir, supportsSandbox});

  // Create package settings and dump them as a .json
  const packageJson = buildPackageJson({contract, frontend, projectName, projectPath, verbose, rootDir, supportsSandbox});
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));

  // Run any language-specific post check
  postMessage({contract, frontend, projectPath, verbose, rootDir, supportsSandbox});

  // Finished!
  return true;
}

export async function createFiles({contract, frontend, projectPath, verbose, rootDir, supportsSandbox}: CreateProjectParams) {
  // skip build artifacts and symlinks
  const skip = ['.cache', 'dist', 'out', 'node_modules', 'yarn.lock', 'package-lock.json'];

  // copy frontend
  if (frontend !== 'none') {
    const sourceTemplateDir = `${rootDir}/frontend/${frontend}`;
    await copyDir(sourceTemplateDir, projectPath, {verbose, skip: skip.map(f => path.join(sourceTemplateDir, f))});
  }

  // shared files
  const sourceSharedDir = `${rootDir}/shared`;
  await copyDir(sourceSharedDir, projectPath, {verbose, skip: skip.map(f => path.join(sourceSharedDir, f))});

  // copy contract files
  const contractSourceDir = `${rootDir}/contracts/${contract}`;
  await copyDir(contractSourceDir, `${projectPath}/contract`, {
    verbose,
    skip: skip.map(f => path.join(contractSourceDir, f))
  });

  // copy tests
  const testFramework = supportsSandbox ? 'workspaces-tests' : 'classic-tests';
  let sourceTestDir = `${rootDir}/integration-tests`;
  if (supportsSandbox) {
    switch(contract) {
      case 'js':
      case 'assemblyscript':
        sourceTestDir = path.resolve(sourceTestDir, testFramework, 'ts');
        break;
      case 'rust':
        sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/rs');
        break;
    }
  } else {
    switch(contract) {
      case 'js':
      case 'assemblyscript':
        sourceTestDir = path.resolve(sourceTestDir, 'classic-tests');
        break;
      case 'rust':
        sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/rs');
        break;
    }
  }
  await copyDir(sourceTestDir, `${projectPath}/integration-tests/`, {
    verbose,
    skip: skip.map(f => path.join(sourceTestDir, f))
  });

  // add .gitignore
  await renameFile(`${projectPath}/near.gitignore`, `${projectPath}/.gitignore`);
}

export const renameFile = async function (oldPath: string, newPath: string) {
  return new Promise<void>((resolve, reject) => {
    fs.rename(oldPath, newPath, (err: Error) => {
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
export function copyDir(source: string, dest: string, {skip, verbose}: {skip: string[], verbose: boolean}) {
  return new Promise<void>((resolve, reject) => {
    const copied: string[] = [];
    const skipped: string[] = [];
    const filter = skip && function(filename: string) {
      const shouldCopy = !skip.find(f => filename.includes(f));
      shouldCopy ? copied.push(filename) : skipped.push(filename);
      return !skip.find(f => filename.includes(f));
    };

    ncp(source, dest, {filter}, (err: Error) => {
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

export async function runDepsInstall(projectPath: string) {
  console.log(chalk`
{green Installing dependencies in a few folders, this might take a while...}
`);
  const npmCommandArgs = ['deps-install'];
  await new Promise<void>((resolve, reject) => spawn('yarn', npmCommandArgs, {
    cwd: projectPath,
    stdio: 'inherit',
  }).on('close', (code: number) => {
    if (code !== 0) {
      console.log(chalk.red('Error installing NEAR project dependencies'));
      reject(code);
    } else {
      resolve();
    }
  }));
}
