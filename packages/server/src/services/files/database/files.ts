import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  storageId: v.id('_storage'),
  name: v.string(),
  checksum: v.string(),
  userId: v.id('users'),
})
  .index('by_checksum', ['checksum'])
  .index('by_user_id', ['userId']);
