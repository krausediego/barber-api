module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[tj]s',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testEnvironment: 'node',
  testMatch: ['**/*.(spec|test).[tj]s'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@/tests/(.+)': '<rootDir>/tests/$1',
  },
  setupFiles: ['<rootDir>/tests/env/setEnvVars.ts'],
};
