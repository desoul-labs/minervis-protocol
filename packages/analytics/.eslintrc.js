/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@minervis-protocol/configs/eslint/react-internal'].map(require.resolve),
};
