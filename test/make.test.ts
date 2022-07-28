import fs from 'fs';
import path from 'path';
import dir from 'node-dir';
import {createProject} from '../src/make';

describe('create', () => {
  const contracts = ['js', 'rust', 'assemblyscript'];
  const frontends = ['react', 'vanilla', 'none'];
  const testMatrix = contracts.flatMap(c => frontends.flatMap(f => [[c, f, true], [c, f, false]]));
  const ts = Date.now();
  test.each(testMatrix)('%o+%o sandbox:%o', async (contract, frontend, supportsSandbox) => {
    const projectName = `${contract}_${frontend}_${supportsSandbox ? 'sandbox' : 'no-sandbox'}`;
    const rootDir = path.resolve(__dirname, '../templates/');
    fs.mkdirSync(path.resolve(__dirname, `../_testrun/${ts}`), {recursive: true});
    const projectPathPrefix = path.resolve(__dirname, `../_testrun/${ts}`);
    const projectPath = path.resolve(projectPathPrefix, projectName);
    await createProject({
      contract,
      frontend,
      projectName,
      verbose: false,
      rootDir,
      projectPath,
      supportsSandbox,
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
            files.forEach((f, n) => {
              const fileName = f.replace(projectPathPrefix, '');
              expect([fileName, allContent[n]]).toMatchSnapshot(`${fileName} ${ supportsSandbox ? 'sandbox' : 'no-sandbox'}`);
            });
            resolve();
          }
        });
    });
  });
});
