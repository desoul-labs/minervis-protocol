import { asyncMap } from 'convex-helpers';
import { v } from 'convex/values';
import { query } from '../../../api/_generated/server.js';

const listFilesArgs = {
  cursor: v.string(),
  size: v.number(),
};

export default query({
  args: listFilesArgs,
  handler: async (ctx, args) => {
    const userId = '0x0'; //TODO: use session
    const { page, continueCursor } = await ctx.db.query('files').paginate({
      numItems: args.size,
      cursor: args.cursor,
    });

    const storageIds = page.map((item) => item.storageId);
    const metadata = await asyncMap(storageIds, ctx.db.system.get);
    const urls = await asyncMap(storageIds, ctx.storage.getUrl);

    const items = page.map((item, i) => {
      return {
        id: item._id,
        name: item.name,
        userId,
        size: metadata[i]?.size ?? NaN,
        createdAt: metadata[i]?._creationTime ?? NaN,
        contentType: metadata[i]?.contentType ?? '',
        url: urls[i] ?? '',
      };
    });

    return {
      items,
      size: items.length,
      cursor: continueCursor,
    };
  },
});
