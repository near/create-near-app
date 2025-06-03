import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';
import * as show from './messages';
import { downloadFile, isCargoNearInstalled } from './utils';
import { CreateContractParams, CreateGatewayParams } from './types';

export async function createProject({ contract, frontend, projectPath, templatesDir }: CreateContractParams & CreateGatewayParams): Promise<boolean> {
  if (contract !== 'none') {
    await createContract({ contract, projectPath, templatesDir });
  } else {
    await createGateway({ frontend, projectPath, templatesDir });
  }

  return true;
}

async function createContract({ contract, projectPath, templatesDir }: CreateContractParams) {
  await createContractFromTemplate({ contract, projectPath, templatesDir });

  if (contract === 'rs') {
    await updateTemplateFiles(projectPath);
  }
}

async function createContractFromTemplate({ contract, projectPath, templatesDir }: CreateContractParams) {
  // contract folder
  const sourceContractDir = path.resolve(templatesDir, 'contracts', contract);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceContractDir, projectPath);
}

async function updateTemplateFiles(projectPath: string) {
  const targetDir = path.join(projectPath);
  const cargoTomlRemotePath = 'https://raw.githubusercontent.com/near/cargo-near/refs/heads/main/cargo-near/src/commands/new/new-project-template/Cargo.template.toml';
  const cargoTomlFilePath = path.join(targetDir, 'Cargo.toml');
  const rustToolchainRemotePath = 'https://raw.githubusercontent.com/near/cargo-near/refs/heads/main/cargo-near/src/commands/new/new-project-template/rust-toolchain.toml';
  const rustToolchainFilePath = path.join(targetDir, 'rust-toolchain.toml');

  show.updatingFiles();

  try {
    await downloadFile(cargoTomlRemotePath, cargoTomlFilePath);
    await downloadFile(rustToolchainRemotePath, rustToolchainFilePath);
  } catch (err) {
    show.updateFilesFailed();
  }
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
