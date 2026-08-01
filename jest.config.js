/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testRegex: 'test/.*\.test\.ts',
  testPathIgnorePatterns: ['/node_modules/', '__snapshots__'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'test/tsconfig.test.json' }],
  },
};
