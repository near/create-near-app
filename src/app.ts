import path from 'path';
import {createProject, runDepsInstall} from './make';
import {promptAndGetConfig, showDepsInstallPrompt,} from './user-input';
import * as show from './messages';

(async function () {
  const promptResult = await promptAndGetConfig();
  if (promptResult === null) {
    return;
  }
  const {
    config: {
      projectName,
      contract,
      frontend,
      tests,
      install
    },
    projectPath,
    isFromPrompts,
  } = promptResult;

  show.creatingApp();

  if (contract === 'assemblyscript') {
    show.assemblyscriptWarning();
  }

  let createSuccess;
  try {
    createSuccess = await createProject({
      contract,
      frontend,
      tests,
      projectName,
      verbose: false,
      rootDir: path.resolve(__dirname, '../templates'),
      projectPath,
    });
  } catch (e) {
    console.error(e);
    createSuccess = false;
  }

  if (createSuccess) {
    show.setupSuccess(projectPath, contract, frontend);
  } else {
    show.setupFailed();
    return;
  }
  if (install) {
    await runDepsInstall(projectPath);
  } else if (isFromPrompts) {
    const {depsInstall} = await showDepsInstallPrompt();
    if (depsInstall) {
      await runDepsInstall(projectPath);
    }
  }
})();