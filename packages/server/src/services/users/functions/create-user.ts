import { v } from 'convex/values';
import { mutation } from '../../../api/_generated/server.js';

const createUserArgs = {
  address: v.string(),
};

export default mutation({
  args: createUserArgs,
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      address: args.address,
      name: args.address,
      earnings: 0,
    });
  },
});
