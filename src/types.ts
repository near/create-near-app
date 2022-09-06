export type Contract = 'js' | 'rust';
export const CONTRACTS: Contract[] = ['js', 'rust'];
export type Frontend = 'react' | 'vanilla' | 'none';
export const FRONTENDS: Frontend[] = ['react', 'vanilla', 'none'];
export type TestingFramework = 'rust' | 'js';
export const TESTING_FRAMEWORKS: TestingFramework[] = ['rust', 'js'];
export type ProjectName = string;
export interface UserConfig {
  contract: Contract;
  frontend: Frontend;
  projectName: ProjectName;
  tests: TestingFramework;
  install: boolean;
}
export type CreateProjectParams = {
  contract: Contract,
  frontend: Frontend,
  tests: TestingFramework,
  projectPath: string,
  projectName: ProjectName,
  verbose: boolean,
  rootDir: string,
}