import { defineSchema } from 'convex/server';
import sessions from '../services/auth/database/sessions.js';
import documents from '../services/documents/database/documents.js';
import files from '../services/files/database/files.js';
import users from '../services/users/database/users.js';

export default defineSchema({
  files,
  documents,
  users,
  sessions,
});
