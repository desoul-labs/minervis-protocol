import { defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineTable({
  userId: v.string(),
  activeExpires: v.float64(),
  idleExpires: v.float64(),
}).index('by_user_id', ['userId']);
