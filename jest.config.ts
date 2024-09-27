module.exports = {
      testEnvironment: "jest-environment-jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      transform: {
            "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
      moduleNameMapper: {
            "^@/components/(.*)$": "<rootDir>/components/$1",
      },
};
