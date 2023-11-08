/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/library'].map(require.resolve),
  rules: {
    'unicorn/filename-case': 'off',
    'no-console': 'off',
  },
  ignorePatterns: [
    // convex generated files
    'src/convex/_generated',
    // convex-helpers: https://github.com/get-convex/convex-helpers
    'src/helpers/migrations.ts',
    'src/helpers/relationships.ts',
    'src/helpers/rowLevelSecurity.ts',
    'src/helpers/middlewareUtils.ts',
    'src/helpers/withZod.ts',
    'src/helpers/withSession.ts',
    'src/helpers/withUser.ts',
    'src/helpers/presence.ts',
  ],
};
