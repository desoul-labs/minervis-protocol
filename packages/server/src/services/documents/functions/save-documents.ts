import { asyncMap } from 'convex-helpers';
import { v } from 'convex/values';
import { internalMutation } from '../../../api/_generated/server.js';
import { digestData } from '../utils/digest-data.js';

const saveDocumentsArgs = {
  fileId: v.id('files'),
  documents: v.array(
    v.object({
      content: v.string(),
      metadata: v.optional(v.any()),
      embedding: v.array(v.float64()),
    }),
  ),
};

export default internalMutation({
  args: saveDocumentsArgs,
  handler: async (ctx, args) => {
    await asyncMap(args.documents, async (doc) => {
      const hash = await digestData(doc.content);
      await ctx.db.insert('documents', {
        fileId: args.fileId,
        content: doc.content,
        embedding: doc.embedding,
        metadata: doc.metadata,
        hash,
      });
    });
  },
});
