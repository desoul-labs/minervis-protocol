import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  storageId: v.id('_storage'),
  name: v.string(),
  checksum: v.string(),
  userId: v.string(),
  status: v.string(),
  documentCount: v.optional(v.int64()),
})
  .index('by_checksum', ['checksum'])
  .index('by_user_id', ['userId']);
