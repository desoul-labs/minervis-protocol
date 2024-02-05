/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@minervis-protocol/configs/eslint/react-internal')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
