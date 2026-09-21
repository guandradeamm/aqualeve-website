const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["<rootDir>/tests/unit/**/*.test.js", "<rootDir>/tests/unit/**/*.test.jsx"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};

module.exports = createJestConfig(customJestConfig);
