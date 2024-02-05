/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:storybook/recommended', require.resolve('@minervis-protocol/configs/eslint/react-internal.js')],
  rules: {
    'import/no-default-export': 'off',
    'unicorn/filename-case': 'off',
  },
};
