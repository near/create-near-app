import fs from 'fs';
import path from 'path';
import dir from 'node-dir';
import {make} from '../scaffold/make';

describe('make all projects', () => {
  const contracts = ['js', 'rust', 'assemblyscript'];
  const frontends = ['react', 'vanilla', 'none'];
  const testMatrix = contracts.flatMap(c => frontends.map(f => [c, f]));
  const ts = Date.now();
  describe('make project files', () => {
    test.each(testMatrix)('contract %o frontend %o', async (contract, frontend) => {
      const projectName = `${contract}_${frontend}`;
      const rootDir = path.resolve(__dirname, '../');
      fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), {recursive: true});
      const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
      const projectPath = path.resolve(projectPathPrefix, projectName);
      await make({
        contract,
        frontend,
        projectName,
        verbose: false,
        rootDir,
        projectPath,
      });
      await new Promise<void>((resolve, reject) => {
        const allContent = [];
        dir.readFiles(projectPath,
          {exclude: ['node_modules', 'Cargo.lock']},
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
              expect(files.map((f, n) => [f.replace(projectPathPrefix, ''), allContent[n]])).toMatchSnapshot();
              resolve();
            }
          });
      });

    });
  });
});
