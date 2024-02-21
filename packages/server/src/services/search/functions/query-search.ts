import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { v } from 'convex/values';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { createRetrieverTool } from 'langchain/tools/retriever';
import { ConvexVectorStore } from 'langchain/vectorstores/convex';
import { internal } from '../../../api/_generated/api.js';
import { action } from '../../../api/_generated/server.js';

export * from 'langchain/util/convex';

const querySearchArgs = {
  query: v.string(),
};

export default action({
  args: querySearchArgs,
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(new OpenAIEmbeddings(), {
      ctx,
      table: 'documents',
      index: 'by_embedding',
      textField: 'content',
      embeddingField: 'embedding',
      metadataField: 'metadata',
      get: internal.documents.query.getDocument,
    });
    const retriever = vectorStore.asRetriever(5);

    const searchTool = new TavilySearchResults();
    // TODO: define tools
    const retrieverTool = createRetrieverTool(retriever, {
      name: 'knowledge_base_search',
      description: 'Search for information about ',
    });
    const tools = [searchTool, retrieverTool];

    const gpt4Turbo = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0,
    });
    // const agent = await createOpenAIFunctionsAgent({
    //   llm: gpt4Turbo,
    //   tools,
    //   prompt,
    // });

    // const executor = new AgentExecutor({
    //   agent,
    //   tools,
    // });
    // const answer = await executor.invoke({
    //   input: args.query,
    // });

    // return answer;
  },
});
