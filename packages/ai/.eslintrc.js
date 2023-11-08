/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/library'].map(require.resolve),
  ignorePatterns: ['**/*.test.ts', 'src/helpers/matcher.ts'],
  rules: {
    'no-console': 'off',
  },
};
