import * as mongoose from 'mongoose';
import INetworkMetric from '../../common/interface/network-metric.interface';

const NetworkMetricSchema = new mongoose.Schema(
  {
    nodeId: String,
    bytesIn: Number,
    bytesOut: Number,
    connections: Number,
    recordedAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export interface INetworkMetricDocument extends INetworkMetric, mongoose.Document {}

export default NetworkMetricSchema;
