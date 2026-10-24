import { jest } from '@jest/globals';
import { fileURLToPath } from 'node:url';
import prompt from 'prompts';
import { spawnSync } from 'child_process';
import path from 'path';
import { getUserAnswers, getUserArgs, validateUserArgs } from '../src/user-input';
import * as show from '../src/messages';
import { UserConfig } from '../src/types';


afterEach(() => { jest.restoreAllMocks(); process.exitCode = 0; });

test('contract prompt chooses a template and name without a language or npm question', async () => {
  prompt.inject(['contract', 'auction-adv', 'auction']);
  expect(await getUserAnswers()).toEqual({ contract: true, template: 'auction-adv', projectName: 'auction', install: false });
});

test.each(['next-app', 'vite-react'])('frontend prompt supports %s', async (frontend) => {
  prompt.inject(['frontend', frontend, 'web', true]);
  expect(await getUserAnswers()).toEqual({ contract: false, frontend, projectName: 'web', install: true });
});

test.each([
  ['--contract'],
  ['--contract', '--template', 'auction-adv'],
  ['--frontend', 'next-app'],
  ['--frontend', 'vite-react', '--install'],
])('parses CLI arguments %j', async (...args) => {
  const original = process.argv;
  process.argv = ['node', 'create-near-app', 'example', ...args];
  try {
    const config = await getUserArgs();
    expect(config.projectName).toBe('example');
    expect(validateUserArgs(config)).toBe(true);
  } finally { process.argv = original; }
});

test.each([
  { contract: false },
  { contract: true, frontend: 'next-app' },
  { contract: false, frontend: 'next-page' },
  { contract: false, frontend: 'next-app', template: 'auction' },
  { contract: true, template: 'missing' },
  { contract: true, install: true },
])('rejects invalid config %j', (input) => {
  const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  expect(validateUserArgs({ projectName: 'example', install: false, ...input } as UserConfig)).toBe(false);
  expect(spy).toHaveBeenCalled();
  expect(process.exitCode).toBe(1);
});

test('Rust instructions use current build and sandbox commands', () => {
  const instructions = show.contractInstructions('auction', true, true);
  expect(instructions).toContain('cargo near build non-reproducible-wasm');
  expect(instructions).toContain('cargo test --locked');
  expect(instructions).not.toContain('npm');
});


test.each([
  ['--contract', 'rs'],
  ['--contract', 'ts'],
  ['--frontend', 'next-page'],
])('rejects removed CLI options %j', (...args) => {
  const result = spawnSync(process.execPath, [path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../index.js'), 'example', ...args], {
    encoding: 'utf8', env: { ...process.env, NEAR_ENV: 'ci' },
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain('error:');
});
