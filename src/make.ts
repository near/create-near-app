import {CreateProjectParams} from './types';
import {show} from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import {ncp} from 'ncp';
import path from 'path';
import {preMessage, postMessage} from './checks';
import {buildPackageJson} from './package-json';

// Method to create the project folder
export async function createProject({contract, frontend, tests, projectPath, projectName, verbose, rootDir}: CreateProjectParams): Promise<boolean> {
  // Make language specific checks
  let preMessagePass = preMessage({contract, projectName, frontend, tests, projectPath, verbose, rootDir});
  if(!preMessagePass){
    return false;
  }

  show.creatingApp();

  // Create files in the project folder
  await createFiles({contract, frontend, projectName, tests, projectPath, verbose, rootDir});

  // Create package.json
  const packageJson = buildPackageJson({contract, frontend, tests, projectName});
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));

  // Run language-specific post check
  postMessage({contract, frontend, projectName, tests, projectPath, verbose, rootDir});

  return true;
}

export async function createFiles({contract, frontend, tests, projectPath, verbose, rootDir}: CreateProjectParams) {
  // skip build artifacts and symlinks
  const skip = ['.cache', 'dist', 'out', 'node_modules'];

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
  let sourceTestDir = `${rootDir}/integration-tests`;
  if (tests === 'workspaces') {
    switch(contract) {
      case 'js':
      case 'assemblyscript':
        sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/ts');
        break;
      case 'rust':
        sourceTestDir = path.resolve(sourceTestDir, 'workspaces-tests/rs');
        break;
    }
  } else {
    sourceTestDir = path.resolve(sourceTestDir, 'classic-tests');
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
    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error(err);
        reject(err);
        return;
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

    ncp(source, dest, {filter}, err => {
      if (err) {
        reject(err);
        return;
      }

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
  show.depsInstall();
  const npmCommandArgs = ['deps-install'];
  await new Promise<void>((resolve, reject) => spawn('yarn', npmCommandArgs, {
    cwd: projectPath,
    stdio: 'inherit',
  }).on('close', (code: number) => {
    if (code !== 0) {
      show.depsInstallError();
      reject(code);
    } else {
      resolve();
    }
  }));
}
