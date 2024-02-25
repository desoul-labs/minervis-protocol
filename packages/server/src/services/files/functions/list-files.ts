import { asyncMap } from 'convex-helpers';
import { v } from 'convex/values';
import { query } from '../../../api/_generated/server.js';

const listFilesArgs = {
  address: v.string(),
  cursor: v.optional(v.string()),
  size: v.number(),
};

export default query({
  args: listFilesArgs,
  handler: async (ctx, args) => {
    const { page, continueCursor } = await ctx.db
      .query('files')
      .withIndex('by_user_id', (q) => q.eq('userId', args.address))
      .paginate({
        numItems: args.size,
        cursor: args.cursor ?? null,
      });

    const storageIds = page.map((item) => item.storageId);
    const metadata = await asyncMap(storageIds, ctx.db.system.get);
    const urls = await asyncMap(storageIds, ctx.storage.getUrl);

    const items = page.map((item, i) => {
      return {
        id: item._id,
        name: item.name,
        size: metadata[i]?.size ?? NaN,
        createdAt: metadata[i]?._creationTime ?? NaN,
        contentType: metadata[i]?.contentType ?? '',
        url: urls[i] ?? '',
        price: item.documentCount ? Number(item.documentCount) : NaN,
        status: item.status,
      };
    });

    return {
      items,
      size: items.length,
      cursor: continueCursor,
    };
  },
});
