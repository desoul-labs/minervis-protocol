import { ConvexError, v } from 'convex/values';
import { query } from '../../../api/_generated/server.js';

const getUserArgs = {
  address: v.string(),
};

export default query({
  args: getUserArgs,
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_address', (q) => q.eq('address', args.address))
      .first();
    if (!user) {
      throw new ConvexError('User not found');
    }

    return {
      address: user.address,
      name: user.address,
    };
  },
});
