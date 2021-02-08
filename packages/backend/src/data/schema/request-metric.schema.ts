import * as mongoose from 'mongoose';
import IRequestMetric from '../../common/interface/request-metric.interface';

const requestMetricSchema = new mongoose.Schema(
  {
    requestId: String,
    nodeId: String,
    query: Object,
    userAgent: String,
    ip: String,
    resolvers: [Object],
    request: Object,
    geo: Object,
    rawResponseBody: String,
    requestDate: Date,
    responseDate: Date,
    latency: Number,
    contentLength: Number,
    error: Object,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    apiDef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ApiDef',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export interface IRequestMetricDocument extends IRequestMetric, mongoose.Document { }


export default requestMetricSchema;
