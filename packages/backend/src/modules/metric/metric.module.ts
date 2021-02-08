import { Module } from '@nestjs/common';
import MetricService from './metric.service';
import RequestMetricSchema from '../../data/schema/request-metric.schema';
import NetworkMetricSchema from '../../data/schema/network-metric.schema';
import { MongooseModule } from '@nestjs/mongoose';
import MetricResolver from './metric.resolver';
import ApiDefModule from '../api-def/api-def.module';

@Module({
  imports: [
    ApiDefModule,
    MongooseModule.forFeature([
      { name: 'RequestMetric', schema: RequestMetricSchema },
      { name: 'NetworkMetric', schema: NetworkMetricSchema },
    ]),
  ],
  providers: [
    MetricService,
    MetricResolver,
  ],
})
export default class MetricModule { }
