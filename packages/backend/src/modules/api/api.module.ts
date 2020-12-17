import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import apiSchema from '../../data/schema/api.schema';
import ApiResolver from './api.resolver';
import ApiService from './api.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Api', schema: apiSchema }])],
  providers: [ApiService, ApiResolver],
})
export default class ApiModule {}
