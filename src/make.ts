import {CreateProjectParams} from './types';
import * as show from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import {ncp} from 'ncp';
import path from 'path';
import {buildPackageJson} from './package-json';

export async function createProject({contract, frontend, tests, projectPath, projectName, verbose, rootDir}: CreateProjectParams): Promise<boolean> {
  // Create files in the project folder
  await createFiles({contract, frontend, projectName, tests, projectPath, verbose, rootDir});

  // Create package.json
  const packageJson = buildPackageJson({contract, frontend, tests, projectName});
  fs.writeFileSync(path.resolve(projectPath, 'package.json'), Buffer.from(JSON.stringify(packageJson, null, 2)));

  return true;
}

export async function createFiles({contract, frontend, tests, projectPath, verbose, rootDir}: CreateProjectParams) {
  // skip build artifacts and symlinks
  const skip = ['.cache', 'dist', 'out', 'node_modules'];

  // copy frontend
  if (frontend !== 'none') {
    const sourceFrontendDir = path.resolve(`${rootDir}/frontend/${frontend}`);
    const sourceSharedFrontendDir = path.resolve(`${rootDir}/frontend/shared`);
    const targetFrontendDir = path.resolve(`${projectPath}/frontend`);
    fs.mkdirSync(targetFrontendDir, { recursive: true });
    await copyDir(sourceFrontendDir, targetFrontendDir, {verbose, skip: skip.map(f => path.join(sourceFrontendDir, f))});
    await copyDir(sourceSharedFrontendDir, targetFrontendDir, {verbose, skip: skip.map(f => path.join(sourceSharedFrontendDir, f))});
  }

  // shared files
  const sourceSharedDir = path.resolve(rootDir, 'shared');
  await copyDir(sourceSharedDir, projectPath, {verbose, skip: skip.map(f => path.join(sourceSharedDir, f))});

  // copy contract files
  const sourceContractDir = path.resolve(rootDir, 'contracts', contract);
  const targetContractDir = path.resolve(projectPath, 'contract');
  fs.mkdirSync(targetContractDir, { recursive: true });
  await copyDir(sourceContractDir, targetContractDir, {
    verbose,
    skip: skip.map(f => path.join(sourceContractDir, f))
  });

  // tests dir
  const targetTestDir = path.resolve(projectPath, 'integration-tests');
  fs.mkdirSync(targetTestDir, { recursive: true });

  // copy tests - shared files
  const sourceTestSharedDir = path.resolve(`${rootDir}/integration-tests/${tests}-tests`);
  await copyDir(sourceTestSharedDir, targetTestDir, {
    verbose,
    skip: skip.map(f => path.join(sourceTestSharedDir, f))
  });

  // add .gitignore
  await renameFile(`${projectPath}/template.gitignore`, `${projectPath}/.gitignore`);
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
  const npmCommandArgs = ['install'];
  await new Promise<void>((resolve, reject) => spawn('npm', npmCommandArgs, {
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
