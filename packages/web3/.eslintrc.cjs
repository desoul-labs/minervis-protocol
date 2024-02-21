/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@minervis-protocol/configs/eslint/library')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
