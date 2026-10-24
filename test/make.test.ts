import { fileURLToPath } from 'node:url';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createProject } from '../src/make';
import { UserConfig } from '../src/types';

const templatesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../templates');
let temporaryDirectory: string;
beforeEach(() => { temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'create-near-app-')); });
afterEach(() => { fs.rmSync(temporaryDirectory, { recursive: true, force: true }); });

const projects: UserConfig[] = [
  { projectName: 'basic', contract: true, template: 'auction', install: false },
  { projectName: 'advanced', contract: true, template: 'auction-adv', install: false },
  { projectName: 'next', contract: false, frontend: 'next-app', install: false },
  { projectName: 'vite', contract: false, frontend: 'vite-react', install: false },
];

test.each(projects)('scaffolds $projectName with only its selected template', async (config) => {
  const projectPath = path.join(temporaryDirectory, config.projectName);
  await createProject({ ...config, templatesDir, projectPath });
  const files = fs.readdirSync(projectPath, { recursive: true }) as string[];
  expect(files).toContain('README.md');
  expect(files).not.toContain('rs');
  expect(files).not.toContain('ts');
  if (config.contract) {
    expect(files).toContain('Cargo.toml');
    expect(files).not.toContain('package.json');
    const manifest = fs.readFileSync(path.join(projectPath, 'Cargo.toml'), 'utf8');
    expect(manifest).toContain('near-sandbox');
    expect(manifest).toContain('near-api');
    expect(manifest).not.toContain('near-workspaces');
    expect(files.includes(path.join('src', 'ext.rs'))).toBe(config.template === 'auction-adv');
  } else {
    expect(files).toContain('package.json');
    expect(files).toContain(path.join('src', 'providers', 'near-provider.tsx'));
    expect(files).not.toContain('Cargo.toml');
    const manifest = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf8'));
    expect(manifest.dependencies['@hot-labs/near-connect']).toBeDefined();
    expect(manifest.dependencies['near-connect-hooks']).toBeUndefined();
  }
});
