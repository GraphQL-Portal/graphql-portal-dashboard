import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import apiDefSchema from '../../data/schema/api-def.schema';
import SourceModule from '../source/source.module';
import ApiDefResolver from './api-def.resolver';
import ApiDefService from './api-def.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ApiDef', schema: apiDefSchema }]), forwardRef(() => SourceModule)],
  providers: [ApiDefService, ApiDefResolver],
  exports: [ApiDefService],
})
export default class ApiDefModule {}
