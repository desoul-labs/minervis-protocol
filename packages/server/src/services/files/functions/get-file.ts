import { ConvexError, v } from 'convex/values';
import { query } from '../../../api/_generated/server.js';

const getFileArgs = {
  id: v.id('files'),
};

export default query({
  args: getFileArgs,
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.id);
    if (!file) {
      throw new ConvexError('File not found');
    }

    const metadata = await ctx.db.system.get(file.storageId);
    if (!metadata) {
      throw new ConvexError('File metadata not found');
    }

    const url = await ctx.storage.getUrl(file.storageId);
    if (!url) {
      throw new ConvexError('Unable to serve file');
    }

    return {
      name: file.name,
      userId: file.userId,
      size: metadata.size,
      createdAt: metadata._creationTime,
      contentType: metadata.contentType,
      url,
    };
  },
});
