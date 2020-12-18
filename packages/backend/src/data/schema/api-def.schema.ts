import * as mongoose from 'mongoose';
import IApiDef from '../../common/interface/api-def.interface';

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
  },
  { versionKey: false, timestamps: true }
);

apiDefSchema.index({ name: 1 }, { unique: true, sparse: true });

export default apiDefSchema;

export interface IApiDefDocument extends IApiDef, mongoose.Document {}
