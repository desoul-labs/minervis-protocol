import { ConvexError, v } from 'convex/values';
import { internal } from '../../../api/_generated/api.js';
import { mutation } from '../../../api/_generated/server.js';

const saveFileArgs = {
  storageId: v.id('_storage'),
  name: v.string(),
  address: v.string(),
};

export default mutation({
  args: saveFileArgs,
  handler: async (ctx, args) => {
    const metadata = await ctx.db.system.get(args.storageId);
    if (!metadata) {
      throw new ConvexError('File not found');
    }

    const exists = await ctx.db
      .query('files')
      .withIndex('by_checksum', (q) => q.eq('checksum', metadata.sha256))
      .first();
    if (exists) {
      await ctx.storage.delete(args.storageId);
      throw new ConvexError('File already exists');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_address', (q) => q.eq('address', args.address))
      .first();
    if (!user) {
      throw new ConvexError('User not found');
    }

    const fileId = await ctx.db.insert('files', {
      storageId: metadata._id,
      name: args.name,
      userId: user._id,
      checksum: metadata.sha256,
    });

    await ctx.scheduler.runAfter(0, internal.files.action.processFile, { id: fileId });
  },
});
