import * as mongoose from 'mongoose';
import { SourceConfig } from '@graphql-portal/types';

const sourceSchema = new mongoose.Schema(
  {
    name: String,
    handler: Object,
    transforms: [Object],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

sourceSchema.index({ name: 1 }, { unique: true, sparse: true });

export default sourceSchema;

export interface ISourceDocument extends mongoose.Document, SourceConfig {}
