// jest.config.js
module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js}"],
  setupTestFrameworkScriptFile: "<rootDir>/config/setupTest.js",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
