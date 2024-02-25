import { v } from 'convex/values';
import { internalMutation } from '../../../api/_generated/server.js';

const updateFileStatusArgs = {
  id: v.id('files'),
  status: v.string(),
  documentCount: v.optional(v.int64()),
};

export default internalMutation({
  args: updateFileStatusArgs,
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      documentCount: args.documentCount,
    });
  },
});
