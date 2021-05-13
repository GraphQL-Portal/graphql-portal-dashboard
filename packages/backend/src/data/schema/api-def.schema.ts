import * as mongoose from 'mongoose';
import { ApiDefStatus } from '@graphql-portal/types';
import IApiDef from '../../common/interface/api-def.interface';
import { ISourceDocument } from './source.schema';
import { IUserDocument } from './user.schema';
import { mongoCipherType } from '../../common/tool/cipher.tool';

const apiDefSchema = new mongoose.Schema(
  {
    name: String,
    endpoint: String,
    enabled: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: Object.values(ApiDefStatus),
      default: ApiDefStatus.INITIALIZED,
    },
    playground: {
      type: Boolean,
      default: true,
    },
    authentication: mongoCipherType,
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
    schema_polling_interval: Number,
    schema_updates_through_control_api: Boolean,
    invalidate_cache_through_control_api: Boolean,
    enable_ip_filtering: Boolean,
    allow_ips: mongoCipherType,
    deny_ips: mongoCipherType,
    request_size_limit: String,
    depth_limit: Number,
    request_complexity_limit: Number,
    rate_limit: Object,
    mesh: Object,
    webhooks: mongoCipherType,
  },
  { versionKey: false, timestamps: true }
);

apiDefSchema.index({ name: 1 }, { unique: true, sparse: true });
apiDefSchema.index({ endpoint: 1 }, { unique: true, sparse: true });

export default apiDefSchema;

export interface IApiDefDocument extends IApiDef, mongoose.Document {
  _id: string;
  sources: ISourceDocument[];
  user: IUserDocument;
}
