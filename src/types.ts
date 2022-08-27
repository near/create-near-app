export type Contract = 'assemblyscript' | 'js' | 'rust';
export const CONTRACTS: Contract[] = ['assemblyscript', 'js', 'rust'];
export type Frontend = 'react' | 'vanilla' | 'none';
export const FRONTENDS: Frontend[] = ['react', 'vanilla', 'none'];
export type TestingFramework = 'rust' | 'js';
export const TESTING_FRAMEWORKS: TestingFramework[] = ['rust', 'js'];
export type ProjectName = string;
export type PackageManager = 'npm' | 'yarn' | 'pnpm';
export const PACKAGE_MANAGERS: PackageManager[] = ['npm', 'yarn', 'pnpm'];
export interface UserConfig {
  contract: Contract;
  frontend: Frontend;
  projectName: ProjectName;
  tests: TestingFramework;
  packageManager: PackageManager;
  install: boolean;
}
export type CreateProjectParams = {
  contract: Contract,
  frontend: Frontend,
  tests: TestingFramework,
  packageManager: PackageManager;
  projectPath: string,
  projectName: ProjectName,
  verbose: boolean,
  rootDir: string,
}