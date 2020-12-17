import * as mongoose from 'mongoose';
import IApi from '../../common/interface/api.interface';

const apiSchema = new mongoose.Schema<IApi>(
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

apiSchema.index({ name: 1 }, { unique: true, sparse: true });

export default apiSchema;

export interface IApiDocument extends IApi, mongoose.Document {}
