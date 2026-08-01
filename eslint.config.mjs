import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'templates',
      'src/**/*.js',
      'jest.config.js',
      '_testrun',
      'coverage',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      indent: ['warn', 2, { SwitchCase: 1 }],
      'linebreak-style': ['warn', 'unix'],
      quotes: ['warn', 'single'],
      semi: ['warn', 'always'],
      'no-console': 'off',
    },
  },
  {
    // plain .js files in this repo (e.g. the bin entry point) are CommonJS
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
