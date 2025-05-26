import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';
import * as show from './messages';
import { CreateContractParams, CreateGatewayParams } from './types';

export async function createProject({ contract, frontend, projectPath, templatesDir }: CreateContractParams  & { contract: boolean } & CreateGatewayParams): Promise<boolean> {
  if (contract) {
    await createContract({ projectPath, templatesDir });
  } else {
    await createGateway({ frontend, projectPath, templatesDir });
  }

  return true;
}

async function createContract({ projectPath, templatesDir }: CreateContractParams) {
  // contract folder
  const sourceContractDir = path.resolve(templatesDir, 'contract');
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
