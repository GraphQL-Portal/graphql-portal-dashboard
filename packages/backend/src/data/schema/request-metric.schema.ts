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
    rawResponseBody: String,
    requestDate: Date,
    responseDate: Date,
    latency: Number,
    contentLength: Number,
    error: Object,
  },
  { versionKey: false, timestamps: true }
);

export interface IRequestMetricDocument extends IRequestMetric, mongoose.Document { }


export default requestMetricSchema;
