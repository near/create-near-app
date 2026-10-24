export type Template = 'auction' | 'auction-adv';
export const TEMPLATES: Template[] = ['auction', 'auction-adv'];

export type Frontend = 'next-app' | 'vite-react';
export const FRONTENDS: Frontend[] = ['next-app', 'vite-react'];

export type ProjectName = string;

export interface UserConfig {
  contract: boolean;
  template?: Template;
  frontend?: Frontend;
  projectName: ProjectName;
  install: boolean;
}

export type CreateProjectParams = Pick<UserConfig, 'contract' | 'template' | 'frontend'> & {
  projectPath: string;
  templatesDir: string;
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
