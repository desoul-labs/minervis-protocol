import { ConvexError, v } from 'convex/values';
import { mutation } from '../../../api/_generated/server.js';

const claimFileRewardArgs = {
  id: v.id('files'),
  address: v.string(),
};

export default mutation({
  args: claimFileRewardArgs,
  handler: async (ctx, args) => {
    const exists = await ctx.db
      .query('fileRewards')
      .withIndex('by_file_id', (q) => q.eq('fileId', args.id))
      .first();
    if (exists) {
      throw new ConvexError('Reward already sent');
    }

    const file = await ctx.db.get(args.id);
    if (!file) {
      throw new ConvexError('File not found');
    }
    if (file.status !== 'completed') {
      throw new ConvexError('File has not been processed');
    }

    await ctx.db.insert('fileRewards', {
      fileId: args.id,
      userId: args.address,
      reward: Number(file.documentCount ?? 0),
    });

    await ctx.db.patch(args.id, {
      status: 'claimed',
    });
  },
});
