import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  fileId: v.id('files'),
  userId: v.string(),
  reward: v.float64(),
}).index('by_file_id', ['fileId']);
