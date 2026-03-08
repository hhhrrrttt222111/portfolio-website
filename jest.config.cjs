module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/__tests__'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '^@/(.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2))$': '<rootDir>/__mocks__/fileMock.js',
      '^@/(.+\\.(css|less|scss|sass))$': 'identity-obj-proxy',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
      '@react-three/fiber': '<rootDir>/__mocks__/reactThreeFiberMock.js',
      'three': '<rootDir>/__mocks__/threeMock.js',
      '^framer-motion$': '<rootDir>/__mocks__/framer-motion.cjs',
      '^lottie-react$': '<rootDir>/__mocks__/lottie-react.js',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      'src/.*/index\\.ts$',
      'src/main\\.tsx$',
      'src/components/visualization/',
    ],
    transformIgnorePatterns: [
      '/node_modules/(?!(@react-three|three)/)',
    ],
  };
