export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/fileTransformer.js",
  },
  transform: {
    "^.+\\.jsx?$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["js", "jsx"],
};
