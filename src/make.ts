import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';
import { execSync } from 'child_process';
import * as show from './messages';
import { CreateContractParams, CreateGatewayParams } from './types';

const fsp = fs.promises;

export async function createProject({ contract, frontend, projectPath, templatesDir }: CreateContractParams & CreateGatewayParams): Promise<boolean> {
  if (contract !== 'none') {
    await createContract({ contract, projectPath, templatesDir });
  } else {
    await createGateway({ frontend, projectPath, templatesDir });
  }

  return true;
}

async function createContract({ contract, projectPath, templatesDir }: CreateContractParams) {
  if (contract === 'rs') {
    const repoUrl = 'https://github.com/near/cargo-near.git';
    const folderInRepo = 'cargo-near/src/commands/new/new-project-template';
    const targetDir = path.join(projectPath);

    try {
      fs.mkdirSync(targetDir, { recursive: true });
      execSync('git init', { cwd: targetDir });
      execSync(`git remote add origin ${repoUrl}`, { cwd: targetDir });
      execSync('git config core.sparseCheckout true', { cwd: targetDir });
      fs.writeFileSync(path.join(targetDir, '.git/info/sparse-checkout'), `${folderInRepo}\n`);
      execSync('git pull origin main', { cwd: targetDir });

      const extractedPath = path.join(targetDir, folderInRepo);
      const finalPath = path.resolve(targetDir);

      await fsp.cp(extractedPath, finalPath, { recursive: true, force: true });
      await fsp.rename(path.join(finalPath, 'Cargo.template.toml'), path.join(finalPath, 'Cargo.toml'));
      await fsp.rm(path.join(finalPath, '.git'), { recursive: true, force: true });
      await fsp.rm(path.join(targetDir, folderInRepo.split('/')[0]), { recursive: true, force: true });
    } catch (err) {
      show.downloadTemplateFailed();
      await createContractFromTemplate({ contract, projectPath, templatesDir });
    }
  } else {
    await createContractFromTemplate({ contract, projectPath, templatesDir });
  }
}

async function createContractFromTemplate({ contract, projectPath, templatesDir }: CreateContractParams) {
  // contract folder
  const sourceContractDir = path.resolve(templatesDir, 'contracts', contract);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceContractDir, projectPath);
}

async function createGateway({ frontend, projectPath, templatesDir }: CreateGatewayParams) {
  const sourceFrontendDir = path.resolve(`${templatesDir}/frontend/${frontend}`);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceFrontendDir, projectPath);
}

// Wrap `ncp` tool to wait for the copy to finish when using `await`
export function copyDir(source: string, dest: string) {
  return new Promise<void>((resolve, reject) => {
    ncp(source, dest, {}, err => err ? reject(err) : resolve());
  });
}

export async function runDepsInstall(projectPath: string) {
  show.depsInstall();
  await new Promise<void>((resolve, reject) => spawn('npm', ['install'], {
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
