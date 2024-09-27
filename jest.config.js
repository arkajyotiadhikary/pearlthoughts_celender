const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': path.resolve(__dirname, './'),
    '^@/components/(.*)$': path.resolve(__dirname, 'components/$1'),
    '^@/lib/(.*)$': path.resolve(__dirname, 'lib/$1'),
    '^@/pages/(.*)$': path.resolve(__dirname, 'pages/$1'),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};