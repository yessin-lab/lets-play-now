export default {
  displayName: 'gathering',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/gathering',
  globalSetup: './src/config/integration-tests/setup.ts',
  globalTeardown: './src/config/integration-tests/teardown.ts',
};
