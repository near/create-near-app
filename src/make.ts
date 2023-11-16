import { CreateContractParams, CreateGatewayParams } from './types';
import * as show from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';

export async function createProject({ contract, frontend, tests, projectPath, templatesDir }: CreateContractParams & CreateGatewayParams): Promise<boolean> {

  if (contract !== 'none') {
    await createContract({ contract, tests, projectPath, templatesDir });
  } else {
    await createGateway({ frontend, projectPath, templatesDir });
  }

  return true;
}

async function createContract({ contract, tests, projectPath, templatesDir }: CreateContractParams) {
  // contract folder
  const sourceContractDir = path.resolve(templatesDir, 'contracts', contract);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceContractDir, projectPath);

  // copy sandbox-test dir
  const targetTestDir = path.resolve(projectPath, `sandbox-${tests}`);
  const sourceTestDir = path.resolve(`${templatesDir}/sandbox-tests/sandbox-${tests}`);

  fs.mkdirSync(targetTestDir);
  await copyDir(sourceTestDir, targetTestDir);

  if (contract === 'rs') {
    if (tests === 'rs') {
      // leave only one test script
      fs.unlinkSync(path.resolve(projectPath, 'test-ts.sh'));
      fs.renameSync(path.resolve(projectPath, 'test-rs.sh'), path.resolve(projectPath, 'test.sh'));

      // add workspace to Cargo.toml
      const cargoTomlPath = path.resolve(projectPath, 'Cargo.toml');
      const cargoToml = fs.readFileSync(cargoTomlPath).toString();
      const cargoTomlWithWorkspace = cargoToml + '\n[workspace]\nmembers = ["sandbox-rs"]';
      fs.writeFileSync(cargoTomlPath, cargoTomlWithWorkspace);
    } else {
      // leave only one test script
      fs.unlinkSync(path.resolve(projectPath, 'test-rs.sh'));
      fs.renameSync(path.resolve(projectPath, 'test-ts.sh'), path.resolve(projectPath, 'test.sh'));
    }
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
