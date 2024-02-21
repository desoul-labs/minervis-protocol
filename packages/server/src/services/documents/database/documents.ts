import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  fileId: v.id('files'),
  content: v.string(),
  metadata: v.optional(v.any()),
  embedding: v.array(v.float64()),
  hash: v.string(),
})
  .index('by_hash', ['hash'])
  .vectorIndex('by_embedding', {
    vectorField: 'embedding',
    dimensions: 1536,
    filterFields: ['fileId'],
  });
