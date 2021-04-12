module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"]
};