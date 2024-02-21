import { OpenAIEmbeddings } from '@langchain/openai';
import { v } from 'convex/values';
import { internalAction } from '../../../api/_generated/server.js';

const embedDocumentsArgs = {
  texts: v.array(v.string()),
};

export default internalAction({
  args: embedDocumentsArgs,
  handler: async (ctx, args) => {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    return embeddings.embedDocuments(args.texts);
  },
});
