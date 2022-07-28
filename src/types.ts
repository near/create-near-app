export type Contract = 'assemblyscript' | 'js' | 'rust';
export type Frontend = 'react' | 'vanilla' | 'none';
export type ProjectName = string;
export interface UserConfig {
  contract: Contract;
  frontend: Frontend;
  projectName: ProjectName;
}