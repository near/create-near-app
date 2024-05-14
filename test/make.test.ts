import fs from 'fs';
import path from 'path';
import dir from 'node-dir';
import { createProject } from '../src/make';
import { Contract, Frontend } from '../src/types';

describe('create contract', () => {
  const contracts: Contract[] = ['ts', 'rs'];

  const ts = Date.now();
  test.each(contracts)('%o', async (contract: Contract) => {
    const projectName = `contract_${contract}`;
    const rootDir = path.resolve(__dirname, '../templates/');
    fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), { recursive: true });
    const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
    const projectPath = path.resolve(projectPathPrefix, projectName);
    await createProject({
      contract,
      frontend: 'none',
      components: false,
      templatesDir: rootDir,
      projectPath,
    });
    await new Promise<void>((resolve, reject) => {
      const allContent = [];
      dir.readFiles(projectPath,
        { exclude: ['node_modules', 'Cargo.lock', 'package-lock.json', 'yarn.lock', '.DS_Store'] },
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

describe('create frontend', () => {
  const frontends: Frontend[] = ['next-app', 'next-page'];

  const ts = Date.now();
  test.each(frontends)('%o', async (frontend: Frontend) => {
    const projectName = `frontend_${frontend}`;
    const rootDir = path.resolve(__dirname, '../templates/');
    fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), { recursive: true });
    const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
    const projectPath = path.resolve(projectPathPrefix, projectName);
    await createProject({
      contract: 'none',
      frontend: frontend,
      components: false,
      templatesDir: rootDir,
      projectPath,
    });
    await new Promise<void>((resolve, reject) => {
      const allContent = [];
      dir.readFiles(projectPath,
        { exclude: ['node_modules', 'Cargo.lock', 'package-lock.json', 'yarn.lock', '.DS_Store'] },
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
