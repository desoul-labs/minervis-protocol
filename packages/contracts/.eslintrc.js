/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/library'].map(require.resolve),
  rules: {
    'no-console': 'off',
    'unicorn/filename-case': 'off',
  },
  ignorePatterns: ['typechain', 'artifacts'],
};
