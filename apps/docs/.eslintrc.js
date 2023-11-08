/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:@docusaurus/recommended', require.resolve('@minervis-protocol/configs/eslint/react-internal')],
  rules: {
    'import/no-default-export': 'off',
    'unicorn/filename-case': 'off',
  },
  ignorePatterns: ['babel.config.js'],
};
