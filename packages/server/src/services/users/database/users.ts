import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  name: v.string(),
  address: v.string(),
  earnings: v.float64(),
}).index('by_address', ['address']);
