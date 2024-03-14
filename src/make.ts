import {CreateGatewayParams } from './types';
import * as show from './messages';
import spawn from 'cross-spawn';
import fs from 'fs';
import { ncp } from 'ncp';
import path from 'path';

export async function createProject({ frontend, projectPath, templatesDir, projectName }:  CreateGatewayParams): Promise<boolean> {

    await createGateway({ frontend, projectPath, templatesDir, projectName });

  return true;
}

async function createGateway({ frontend, projectPath, templatesDir, projectName }: CreateGatewayParams) {
  const sourceFrontendDir = path.resolve(`${templatesDir}/frontend/next-app`);
  const sourceWidgetDir = path.resolve(`${templatesDir}/frontend/components`);
  fs.mkdirSync(projectPath, { recursive: true });
  await copyDir(sourceFrontendDir, projectPath);
  //const widgetPath = `${projectPath}/apps/${projectName}`
  const widgetPath = `${projectPath}/apps/hello-near`
  fs.mkdirSync(widgetPath, { recursive: true })
  await copyDir(sourceWidgetDir, widgetPath);
}

// Wrap `ncp` tool to wait for the copy to finish when using `await`
export function copyDir(source: string, dest: string) {
  return new Promise<void>((resolve, reject) => {
    ncp(source, dest, {}, err => err ? reject(err) : resolve());
    //fs.mkdirSync(dest + '/apps/${gatewayName}')
    //add bos.config.json
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
