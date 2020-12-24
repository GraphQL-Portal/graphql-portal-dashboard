module.exports = {
  preset: '@shelf/jest-mongodb',
  projects: [
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.ts'],
      rootDir: 'src',
    },
    {
      displayName: 'test',
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: 'src',
      testRegex: '.spec.ts$',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      coverageDirectory: '../coverage',
      collectCoverage: true,
      coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '.dto.ts$'],
      testEnvironment: 'node',
    },
  ],
};
