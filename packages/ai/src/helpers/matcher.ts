/* eslint-disable @typescript-eslint/no-namespace -- disable rule for matcher namespce */
import type { GradingConfig } from 'promptfoo';
import { assertions } from 'promptfoo';

const { matchesSimilarity, matchesLlmRubric } = assertions;

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchSemanticSimilarity: (expected: string, threshold?: number) => R;
      toPassLLMRubric: (expected: string, gradingConfig: GradingConfig) => R;
    }
  }
}

export function installJestMatchers(): void {
  expect.extend({
    async toMatchSemanticSimilarity(
      received: string,
      expected: string,
      threshold = 0.8,
    ): Promise<jest.CustomMatcherResult> {
      const result = await matchesSimilarity(received, expected, threshold as number);
      const pass = received === expected || result.pass;
      if (pass) {
        return {
          message: () => `expected ${received} not to match semantic similarity with ${expected}`,
          pass: true,
        };
      }
      return {
        message: () =>
          `expected ${received} to match semantic similarity with ${expected}, but it did not. Reason: ${result.reason}`,
        pass: false,
      };
    },

    async toPassLLMRubric(
      received: string,
      expected: string,
      gradingConfig: GradingConfig,
    ): Promise<jest.CustomMatcherResult> {
      const gradingResult = await matchesLlmRubric(expected, received, gradingConfig);
      if (gradingResult.pass) {
        return {
          message: () => `expected ${received} not to pass LLM Rubric with ${expected}`,
          pass: true,
        };
      }
      return {
        message: () =>
          `expected ${received} to pass LLM Rubric with ${expected}, but it did not. Reason: ${gradingResult.reason}`,
        pass: false,
      };
    },
  });
}
