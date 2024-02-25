import { v } from 'convex/values';
import { api } from '../../../api/_generated/api.js';
import { action } from '../../../api/_generated/server.js';

const signUpArgs = {
  address: v.string(),
};

export default action({
  args: signUpArgs,
  handler: async (ctx, args) => {
    try {
      await ctx.runQuery(api.users.query.getUser, { address: args.address });
    } catch (e) {
      await ctx.runMutation(api.users.mutation.createUser, {
        address: args.address,
      });
    }
  },
});
