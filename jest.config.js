module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  /**
   * Building the TS test files is inevitable since eslint
   * requires them to be accounted for in building it in
   * order to lint them - so we ignore the built tests
   * to avoid running duplicate tests
   */
  testPathIgnorePatterns: ['build'],
};
