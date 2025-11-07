export type Contract = 'ts' | 'rs' | 'none';
export const CONTRACTS: Contract[] = ['ts', 'rs', 'none'];

export type Template = 'auction' | 'auction-adv';
export const TEMPLATES: Template[] = ['auction', 'auction-adv'];

export type Frontend = 'next-app' | 'next-page' | 'vite-react' | 'none';
export const FRONTENDS: Frontend[] = ['next-app', 'next-page', 'vite-react', 'none'];

export type App = 'contract' | 'gateway';
export const APPS: App[] = ['contract', 'gateway'];

export type ProjectName = string;

export interface UserConfig {
  contract: Contract;
  template?: Template;
  frontend: Frontend;
  projectName: ProjectName;
  install: boolean;
  error: (() => void) | undefined;
}

export type CreateContractParams = {
  contract: Contract,
  template: Template,
  projectPath: string,
  templatesDir: string,
}

export type CreateGatewayParams = {
  frontend: Frontend,
  projectPath: string,
  templatesDir: string,
}

export type FrontendMessage = {
  [key in Exclude<Frontend, 'none'>]: string;
};

export type TrackingEventName = 'contract' | 'frontend' | 'error';
export type TrackingEventPayload = {
  distinct_id: string,
  event: TrackingEventName,
  properties: {
    engine: string,
    os: string,
    language?: string,
    framework?: string
  },
  timestamp: Date,
};