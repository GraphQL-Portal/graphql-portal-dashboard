import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from '../../data/schema/user.schema';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export default class AuthModule { }
