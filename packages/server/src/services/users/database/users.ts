import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  name: v.string(),
  address: v.string(),
}).index('by_address', ['address']);
