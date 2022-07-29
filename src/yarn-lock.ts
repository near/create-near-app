import {Contract, Frontend} from './types';
import path from 'path';
import {promises as fs} from 'fs';

export const yarnLock = async (contract: Contract, frontend: Frontend, projectPath: string, supportsSandbox: boolean, rootDir: string) => {
  const dir = path.resolve(rootDir, 'lock-file', `${contract}-${frontend}`);
  try {
    const source = path.resolve(dir, 'root.yarn.lock');
    const dist = path.resolve(projectPath, 'yarn.lock');
    await fs.copyFile(source, dist);
  } catch(e) {
    // pass
  }
};
