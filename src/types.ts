export type Contract = 'assemblyscript' | 'js' | 'rust';
export type Frontend = 'react' | 'vanilla' | 'none';
export type ProjectName = string;
export interface UserConfig {
  contract: Contract;
  frontend: Frontend;
  projectName: ProjectName;
}
export type CreateProjectParams = {
  contract: Contract,
  frontend: Frontend,
  projectPath: string,
  projectName: ProjectName,
  verbose: boolean,
  rootDir: string,
  supportsSandbox: boolean,
}