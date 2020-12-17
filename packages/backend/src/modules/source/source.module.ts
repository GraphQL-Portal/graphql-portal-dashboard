import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import sourceSchema from '../../data/schema/source.schema';
import SourceResolver from './source.resolver';
import SourceService from './source.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Source', schema: sourceSchema }])],
  providers: [SourceService, SourceResolver],
})
export default class SourceModule {}
