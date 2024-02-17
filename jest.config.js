export default {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      // モックの設定など
      // '\\.(css|jpg|png)$': '<rootDir>/mocks/fileMock.js',
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"]
  };