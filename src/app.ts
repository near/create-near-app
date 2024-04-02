import path from 'path';
import { createProject, runDepsInstall } from './make';
import { promptAndGetConfig, } from './user-input';
import * as show from './messages';

(async function () {
  const prompt = await promptAndGetConfig();
  if (prompt === undefined) return;

  const {
    config: {
      projectName,
      contract,
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
      frontend,
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