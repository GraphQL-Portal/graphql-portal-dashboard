import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import sourceSchema from '../../data/schema/source.schema';
import ApiDefModule from '../api-def/api-def.module';
import SourceResolver from './source.resolver';
import SourceService from './source.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Source', schema: sourceSchema }]),
    forwardRef(() => ApiDefModule),
  ],
  providers: [SourceService, SourceResolver],
  exports: [SourceService],
})
export default class SourceModule {}
