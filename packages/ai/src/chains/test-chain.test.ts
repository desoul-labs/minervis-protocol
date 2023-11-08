import { installJestMatchers } from '../helpers';
import { myChain } from './test-chain';

installJestMatchers();

describe('semantic similarity tests', () => {
  test('should pass when strings are semantically similar', async () => {
    const res = await myChain.call({ character: 'プライス大尉' });
    expect('任務が終わった').toMatchSemanticSimilarity(res.text);
  });
  test('should fail when strings are not semantically similar', async () => {
    const res = await myChain.call({ character: 'プライス大尉' });
    expect('I hate type any').not.toMatchSemanticSimilarity(res.text);
  });
});
