import { ConvexError, v } from 'convex/values';
import type { Document } from 'langchain/document';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import type { RecursiveCharacterTextSplitterParams } from 'langchain/text_splitter';
import { MarkdownTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { api, internal } from '../../../api/_generated/api.js';
import { internalAction } from '../../../api/_generated/server.js';
import { separators } from '../utils/constants.js';

const processFileArgs = {
  id: v.id('files'),
};

export default internalAction({
  args: processFileArgs,
  handler: async (ctx, args) => {
    const file = await ctx.runQuery(api.files.query.getFile, { id: args.id });
    const blob = await fetch(file.url).then((res) => res.blob());

    const params: Partial<RecursiveCharacterTextSplitterParams> = {
      chunkSize: 1000,
      chunkOverlap: 0,
      separators,
    };
    let docs: Document[] = [];
    if (file.contentType === 'application/pdf') {
      const loader = new WebPDFLoader(blob);
      const splitter = new RecursiveCharacterTextSplitter(params);
      docs = await loader.loadAndSplit(splitter);
    } else if (file.contentType === 'text/csv') {
      const loader = new CSVLoader(blob);
      docs = await loader.load();
    } else if (file.contentType === 'text/markdown') {
      const loader = new TextLoader(blob);
      const splitter = new MarkdownTextSplitter(params);
      docs = await loader.loadAndSplit(splitter);
    } else if (file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const loader = new DocxLoader(blob);
      const splitter = new RecursiveCharacterTextSplitter(params);
      docs = await loader.loadAndSplit(splitter);
    } else if (file.contentType === 'text/plain') {
      const loader = new TextLoader(blob);
      const splitter = new RecursiveCharacterTextSplitter(params);
      docs = await loader.loadAndSplit(splitter);
    } else {
      throw new ConvexError('File type not supported');
    }

    const uniqueDocs = await ctx.runQuery(internal.documents.query.dedupeDocuments, { documents: docs });
    const embeddings = await ctx.runAction(internal.documents.action.embedDocuments, {
      texts: uniqueDocs.map((doc) => doc.pageContent),
    });

    await ctx.runMutation(internal.documents.mutation.saveDocuments, {
      fileId: args.id,
      documents: uniqueDocs.map((doc, i) => ({
        metadata: doc.metadata,
        content: doc.pageContent,
        embedding: embeddings[i] ?? [],
      })),
    });

    await ctx.runMutation(internal.files.mutation.updateFileStatus, {
      id: args.id,
      status: 'completed',
      documentCount: BigInt(uniqueDocs.length),
    });
  },
});
