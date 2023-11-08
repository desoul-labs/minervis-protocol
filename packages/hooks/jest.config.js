const browser = require('@minervis-protocol/configs/jest/browser');

/** @type {import('jest').Config} */
module.exports = {
  ...browser,
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
};
