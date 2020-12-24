import * as mongoose from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';
import { ISourceDocument } from './source.schema';
import { IUserDocument } from './user.schema';

const apiDefSchema = new mongoose.Schema<IApiDef>(
  {
    name: String,
    endpoint: String,
    sources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

apiDefSchema.index({ name: 1 }, { unique: true, sparse: true });

export default apiDefSchema;

export interface IApiDefDocument extends IApiDef, mongoose.Document {
  sources: ISourceDocument[];
  user: IUserDocument;
}
