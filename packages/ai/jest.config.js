const node = require('@minervis-protocol/configs/jest/node');

/** @type {import('jest').Config} */
module.exports = {
  ...node,
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  testTimeout: 10000, // LLMのテストに時間がかかるため
};
