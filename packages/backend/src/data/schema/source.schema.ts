import * as mongoose from 'mongoose';
import { Source } from '@graphql-mesh/types/config';

const sourceSchema = new mongoose.Schema<Source>(
  {
    name: String,
    handler: Object,
    transforms: [Object],
  },
  { versionKey: false, timestamps: true }
);

sourceSchema.index({ name: 1 }, { unique: true, sparse: true });

export default sourceSchema;

export interface ISourceDocument extends Source, mongoose.Document {}
