import { ConvexError, v } from 'convex/values';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { internalAction } from '../../../api/_generated/server.js';

const retrieveDocumentsArgs = {
  query: v.string(),
};

export default internalAction({
  args: retrieveDocumentsArgs,
  handler: async (ctx, args) => {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const vector = await embeddings.embedDocuments([args.query]).then((e) => e[0]);
    if (!vector) {
      throw new ConvexError('Failed to embed query');
    }

    const results = await ctx.vectorSearch('documents', 'by_embedding', {
      vector,
      limit: 5,
    });
    return results;
  },
});
