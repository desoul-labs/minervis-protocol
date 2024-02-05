/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@minervis-protocol/configs/eslint/next'].map(require.resolve),
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
