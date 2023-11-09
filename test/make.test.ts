import fs from 'fs';
import path from 'path';
import dir from 'node-dir';
import {createProject} from '../src/make';
import {Contract, Frontend, TestingFramework} from '../src/types';

describe('create contract', () => {
  const contracts: Contract[] = ['ts', 'rs'];
  const frontends: Frontend[] = ['none'];
  const tests: TestingFramework[] = ['ts', 'rs'];
  // all combinations of the above
  const testMatrix = contracts.flatMap(c => frontends.flatMap(f => tests.map(t => ([c, f, t]))));

  const ts = Date.now();
  test.each(testMatrix)('%o %o %o', async (contract: Contract, frontend: Frontend, tests: TestingFramework) => {
    const projectName = `${contract}_${frontend}_${tests}`;
    const rootDir = path.resolve(__dirname, '../templates/');
    fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), {recursive: true});
    const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
    const projectPath = path.resolve(projectPathPrefix, projectName);
    await createProject({
      contract,
      frontend,
      tests,
      projectName,
      templatesDir: rootDir,
      projectPath,
    });
    await new Promise<void>((resolve, reject) => {
      const allContent = [];
      dir.readFiles(projectPath,
        {exclude: ['node_modules', 'Cargo.lock', 'package-lock.json', 'yarn.lock', '.DS_Store']},
        function (err, content, next) {
          if (err) {
            reject(err);
          }
          allContent.push(content);
          next();
        },
        function (err, files) {
          if (err) {
            reject(err);
          } else {
            files.forEach((f, n) => {
              const fileName: string = f.replace(projectPathPrefix, '').replace(/\//g, '--').replace(/\\/g, '--');
              expect([fileName, allContent[n]]).toMatchSnapshot(`${fileName}`);
            });
            resolve();
          }
        });
    });
  });
});

describe('create', () => {
  const contracts: Contract[] = ['none'];
  const frontends: Frontend[] = ['next', 'vanilla'];
  const tests: TestingFramework[] = ['none'];
  // all combinations of the above
  const testMatrix = contracts.flatMap(c => frontends.flatMap(f => tests.map(t => ([c, f, t]))));

  const ts = Date.now();
  test.each(testMatrix)('%o %o %o', async (contract: Contract, frontend: Frontend, tests: TestingFramework) => {
    const projectName = `${contract}_${frontend}_${tests}`;
    const rootDir = path.resolve(__dirname, '../templates/');
    fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), {recursive: true});
    const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
    const projectPath = path.resolve(projectPathPrefix, projectName);
    await createProject({
      contract,
      frontend,
      tests,
      projectName,
      templatesDir: rootDir,
      projectPath,
    });
    await new Promise<void>((resolve, reject) => {
      const allContent = [];
      dir.readFiles(projectPath,
        {exclude: ['node_modules', 'Cargo.lock', 'package-lock.json', 'yarn.lock', '.DS_Store']},
        function (err, content, next) {
          if (err) {
            reject(err);
          }
          allContent.push(content);
          next();
        },
        function (err, files) {
          if (err) {
            reject(err);
          } else {
            files.forEach((f, n) => {
              const fileName: string = f.replace(projectPathPrefix, '').replace(/\//g, '--').replace(/\\/g, '--');
              expect([fileName, allContent[n]]).toMatchSnapshot(`${fileName}`);
            });
            resolve();
          }
        });
    });
  });
});
