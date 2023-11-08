/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/react-internal'].map(require.resolve),
  rules: {
    'unicorn/filename-case': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
  },
};
