export type Frontend = 'next-app' | 'none';
export const FRONTENDS: Frontend[] = ['next-app', 'none'];


export type App = 'gateway';
export const APPS: App[] = ['gateway'];
export type ProjectName = string;
export interface UserConfig {
  frontend: Frontend;
  projectName: ProjectName;
  install: boolean;
}


export type CreateGatewayParams = {
  frontend: Frontend,
  projectPath: string,
  templatesDir: string,
  projectName: string
}

export type FrontendMessage = {
  [key in Exclude<Frontend, 'none'>]: string;
};