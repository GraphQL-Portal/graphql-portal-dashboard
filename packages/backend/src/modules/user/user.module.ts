import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema from '../../data/schema/user.schema';
import ConfirmationCodeSchema from '../../data/schema/confirmation-code.schema';
import TokenSchema from '../../data/schema/token.schema';
import UserResolver from './user.resolver';
import UserService from './user.service';
import TokenService from './token.service';
import UserController from './user.controller';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'ConfirmationCode', schema: ConfirmationCodeSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [UserService, UserResolver, TokenService],
  exports: [UserService, TokenService],
})
export default class UserModule {}
