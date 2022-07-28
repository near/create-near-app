/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "test/.*\.test\.ts",
  testPathIgnorePatterns: ['/node_modules/', '__snapshots__'],
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.test.json'
    }
  }
};