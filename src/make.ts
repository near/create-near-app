import { CreateContractParams, CreateGatewayParams } from './types';
import * as show from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';

export async function createProject({ contract, frontend, components, projectPath, templatesDir }: CreateContractParams & CreateGatewayParams): Promise<boolean> {
  if (contract !== 'none') {
    await createContract({ contract, projectPath, templatesDir });
  } else {
    await createGateway({ frontend, components, projectPath, templatesDir });
  }

  return true;
}

async function createContract({ contract, projectPath, templatesDir }: CreateContractParams) {
  // contract folder
  const sourceContractDir = path.resolve(templatesDir, 'contracts', contract);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceContractDir, projectPath);

}

async function createGateway({ frontend, components, projectPath, templatesDir }: CreateGatewayParams) {
  const sourceFrontendDir = path.resolve(`${templatesDir}/frontend/${frontend}`);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceFrontendDir, projectPath);

  if (components) {
    const sourceComponentsDir = path.resolve(`${templatesDir}/frontend/components/${frontend}`);
    await copyDir(sourceComponentsDir, projectPath);
  }
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
