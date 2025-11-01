import path from 'path';
import semver from 'semver';

import { createProject, runDepsInstall } from './make';
import { promptAndGetConfig, } from './user-input';
import * as show from './messages';
import { isCargoNearInstalled } from './utils';

(async function () {

  const supportedNodeVersion = require('../package.json').engines.node;
  if (!semver.satisfies(process.version, supportedNodeVersion)) {
    return show.unsupportedNodeVersion(supportedNodeVersion);
  }

  const prompt = await promptAndGetConfig();
  if (prompt === undefined) return;

  const {
    config: {
      projectName,
      contract,
      template,
      frontend,
      install,
    },
    projectPath,
  } = prompt;

  show.creatingApp();

  let createSuccess;
  try {
    createSuccess = await createProject({
      contract,
      template: template || 'guest-book',
      frontend,
      templatesDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
  } catch (e) {
    console.error(e);
    createSuccess = false;
  }

  let needsToInstallCargoNear = false;

  if (contract === 'rs') {
    show.checkingCargoNear();

    let cargoNearInstalled = await isCargoNearInstalled();
    if (!cargoNearInstalled) {
      needsToInstallCargoNear = true;
      show.cargoNearIsNotInstalled();
    }
  }


  if (createSuccess) {
    install && await runDepsInstall(projectPath);
    show.setupSuccess(projectName, contract, frontend, install, needsToInstallCargoNear);
  } else {
    return show.setupFailed();
  }
})();