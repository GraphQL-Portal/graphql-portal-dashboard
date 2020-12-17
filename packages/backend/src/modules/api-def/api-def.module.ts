import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import apiDefSchema from '../../data/schema/api-def.schema';
import ApiDefResolver from './api-def.resolver';
import ApiDefService from './api-def.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ApiDef', schema: apiDefSchema }])],
  providers: [ApiDefService, ApiDefResolver],
})
export default class ApiDefModule {}
