module.exports = {
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Your Jest setup file
      transform: {
            "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest for transforming JS/TS files
      },
      testEnvironment: "jsdom", // For testing React components in a DOM-like environment
};
