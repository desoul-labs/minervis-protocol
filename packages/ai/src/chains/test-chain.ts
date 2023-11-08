import type { BaseCallbackConfig, Callbacks } from 'langchain/callbacks';
import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- required for type inference
import type { ChainValues } from 'langchain/schema';
import { wandbTracer } from '../helpers/tracer';

class MyChain extends LLMChain {
  @wandbTracer({
    name: LLMChain.lc_name(),
  })
  call(values: ChainValues, config?: BaseCallbackConfig | Callbacks): Promise<ChainValues> {
    return super.call(values, config);
  }
}

const prompt = new PromptTemplate({
  inputVariables: ['character'],
  template: 'Call Of Duty Modern warfareシリーズで登場した{character}の真似をした台詞を一つください。',
});

const model = new OpenAI({ temperature: 0, modelName: 'gpt-4' });
export const myChain = new MyChain({ llm: model, prompt });
