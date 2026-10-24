import path from 'path';
import { readFileSync } from 'node:fs';
import semver from 'semver';
import { createProject, runDepsInstall } from './make';
import { promptAndGetConfig } from './user-input';
import * as show from './messages';
import { isCargoNearInstalled } from './utils';

(async function () {
  const supportedNodeVersion = JSON.parse(readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')).engines.node;
  if (!semver.satisfies(process.version, supportedNodeVersion)) {
    process.exitCode = 1;
    return show.unsupportedNodeVersion(supportedNodeVersion);
  }

  const result = await promptAndGetConfig();
  if (!result) return;
  const { config, projectPath } = result;
  const { projectName, contract, frontend, install } = config;

  try {
    show.creatingApp();
    await createProject({
      ...config,
      templatesDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
    let needsCargoNear = false;
    if (contract) {
      show.checkingCargoNear();
      needsCargoNear = !isCargoNearInstalled();
      if (needsCargoNear) show.cargoNearIsNotInstalled();
    }
    if (install) await runDepsInstall(projectPath);
    show.setupSuccess(projectName, contract, frontend, install, needsCargoNear);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    show.setupFailed();
  }
})();
