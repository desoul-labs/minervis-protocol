/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/next'].map(require.resolve),
};
