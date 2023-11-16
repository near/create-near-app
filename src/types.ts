export type Contract = 'ts' | 'rs' | 'none';
export const CONTRACTS: Contract[] = ['ts', 'rs', 'none'];
export type Frontend = 'next' | 'vanilla' | 'none';
export const FRONTENDS: Frontend[] = ['next', 'vanilla', 'none'];
export type TestingFramework = 'rs' | 'ts' | 'none';
export const TESTING_FRAMEWORKS: TestingFramework[] = ['rs', 'ts', 'none'];
export type App = 'contract' | 'gateway';
export const APPS: App[] = ['contract', 'gateway'];
export type ProjectName = string;
export interface UserConfig {
  contract: Contract;
  frontend: Frontend;
  projectName: ProjectName;
  tests: TestingFramework;
  install: boolean;
}

export type CreateContractParams = {
  contract: Contract,
  tests: TestingFramework,
  projectPath: string,
  templatesDir: string,
}

export type CreateGatewayParams = {
  frontend: Frontend,
  projectPath: string,
  templatesDir: string,
}