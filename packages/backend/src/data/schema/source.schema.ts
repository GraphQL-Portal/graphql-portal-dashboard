import { SourceConfig } from '@graphql-portal/types';
import * as mongoose from 'mongoose';
import { mongoCipherType } from '../../common/tool/cipher.tool';

const sourceSchema = new mongoose.Schema(
  {
    name: String,
    handler: mongoCipherType,
    transforms: [Object],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sourceSchema: String,
  },
  { versionKey: false, timestamps: true }
);

sourceSchema.index({ name: 1 }, { unique: true, sparse: true });

export default sourceSchema;

export interface ISourceDocument extends mongoose.Document, SourceConfig {
  sourceSchema?: string;
}
