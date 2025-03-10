/** @type {import('jest').Config} */
export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": [
        "babel-jest",
        { presets: ["next/babel", "@babel/preset-react"] }
      ]
    },
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: {
      "^@repo/ui(.*)$": "<rootDir>/packages/ui$1",
      "^@repo/types(.*)$": "<rootDir>/packages/types$1",
      "^@repo/store(.*)$": "<rootDir>/packages/store$1"
    },
  };
  