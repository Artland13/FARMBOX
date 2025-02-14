export default {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.css$': 'jest-css-modules-transform'
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
      '^@img/(.*)$': '<rootDir>/src/assets/img/$1',
      '^@fonts/(.*)$': '<rootDir>/src/assets/fonts/$1',
      '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
      '^@pages/(.*)$': '<rootDir>/src/pages/$1',
      '^@store/(.*)$': '<rootDir>/src/store/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jsdom'
  };
  