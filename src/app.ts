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
      frontend,
      install,
    },
    projectPath,
  } = prompt;

  show.creatingApp();

  let createSuccess;
  try {
    createSuccess = await createProject({
      frontend,
      templatesDir: path.resolve(__dirname, '../templates'),
      projectPath,
      projectName
    });
  } catch (e) {
    console.error(e);
    createSuccess = false;
  }

  if (createSuccess) {
    install && await runDepsInstall(projectPath);
    show.setupSuccess(projectName, frontend, install);
  } else {
    return show.setupFailed();
  }
})();