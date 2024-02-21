import { v } from 'convex/values';
import { internalQuery } from '../../../api/_generated/server.js';

const getDocumentArgs = {
  id: v.id('documents'),
};

export default internalQuery({
  args: getDocumentArgs,
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  },
});
