import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import * as show from './messages';
import { CreateProjectParams } from './types';

export async function createProject({ contract, template = 'auction', frontend, projectPath, templatesDir }: CreateProjectParams): Promise<void> {
  if (!!contract === !!frontend) throw new Error('Choose a contract or a frontend');
  const source = contract
    ? path.resolve(templatesDir, 'contracts', template)
    : path.resolve(templatesDir, 'frontend', frontend!);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(source, projectPath);
}

export async function copyDir(source: string, dest: string) {
  await fs.promises.cp(source, dest, {
    recursive: true,
    filter: (entry) => !['node_modules', 'target', '.next', 'dist', 'build', '.git'].includes(path.basename(entry)),
  });
}

export async function runDepsInstall(projectPath: string) {
  show.depsInstall();
  await new Promise<void>((resolve, reject) => spawn('npm', ['install'], {
    cwd: projectPath,
    stdio: 'inherit',
  }).on('error', reject).on('close', (code: number) => {
    if (code !== 0) {
      show.depsInstallError();
      reject(new Error(`npm install exited with code ${code}`));
    } else {
      resolve();
    }
  }));
}
