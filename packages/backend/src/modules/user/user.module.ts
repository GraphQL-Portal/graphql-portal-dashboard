import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from '../../data/schema/user.schema';
import UserResolver from './user.resolver';
import UserService from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export default class UserModule { }
