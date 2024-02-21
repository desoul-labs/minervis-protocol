import { mutation } from '../../../api/_generated/server.js';

export default mutation(async (ctx) => {
  return ctx.storage.generateUploadUrl();
});
