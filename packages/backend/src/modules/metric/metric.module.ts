import { Module } from '@nestjs/common';
import MetricService from './metric.service';
import RequestMetricSchema from '../../data/schema/request-metric.schema';
import NetworkMetricSchema from '../../data/schema/network-metric.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RequestMetric', schema: RequestMetricSchema },
      { name: 'NetworkMetric', schema: NetworkMetricSchema },
    ]),
  ],
  providers: [
    MetricService
  ],
})
export default class MetricModule { }
