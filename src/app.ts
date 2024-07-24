import path from 'path';
import semver from 'semver';

import { createProject, runDepsInstall } from './make';
import { promptAndGetConfig, } from './user-input';
import * as show from './messages';
import { trackUsage } from './tracking';

(async function () {

  const supportedNodeVersion = require('../package.json').engines.node;
  if (!semver.satisfies(process.version, supportedNodeVersion)) {
    return show.unsupportedNodeVersion(supportedNodeVersion);
  }

  if (process.platform === 'win32') {
    trackUsage('none', false, 'none');
    return show.windowsWarning();
  }

  const prompt = await promptAndGetConfig();
  if (prompt === undefined) return;

  const {
    config: {
      projectName,
      contract,
      frontend,
      components,
      install,
    },
    projectPath,
  } = prompt;

  show.creatingApp();

  let createSuccess;
  try {
    createSuccess = await createProject({
      contract,
      frontend,
      components,
      templatesDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
  } catch (e) {
    console.error(e);
    createSuccess = false;
  }

  if (createSuccess) {
    install && await runDepsInstall(projectPath);
    show.setupSuccess(projectName, contract, frontend, install);
  } else {
    return show.setupFailed();
  }
})();