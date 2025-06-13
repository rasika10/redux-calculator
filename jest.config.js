export default {
  testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
    // Mock all CSS imports with a simple JS object
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
};