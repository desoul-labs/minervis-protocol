import { v } from 'convex/values';
import type { Document } from 'langchain/document';
import { internalQuery } from '../../../api/_generated/server.js';
import { digestData } from '../utils/digest-data.js';

const dedupeDocumentsArgs = {
  documents: v.array(
    v.object({
      pageContent: v.string(),
      metadata: v.any(),
    }),
  ),
};

export default internalQuery({
  args: dedupeDocumentsArgs,
  handler: async (ctx, args) => {
    const newDocs = [] as Document[];
    for (const doc of args.documents) {
      const hash = await digestData(doc.pageContent);
      const exists = await ctx.db
        .query('documents')
        .withIndex('by_hash', (q) => q.eq('hash', hash))
        .first();

      if (exists) {
        continue;
      }
      newDocs.push(doc);
    }

    return newDocs;
  },
});
