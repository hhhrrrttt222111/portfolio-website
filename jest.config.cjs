module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/__tests__'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      'src/.*/index\\.ts$',
      'src/main\\.tsx$',
    ],
  };