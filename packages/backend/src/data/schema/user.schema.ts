import * as mongoose from 'mongoose';
import crypto from 'crypto';
import { config } from 'node-config-ts';
import Roles from '../../common/enum/roles.enum';
import IUser from '../../common/interface/user.interface';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.USER,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      match: /\S+@\S+\.\S+/,
      index: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.methods.setPassword = function (password: string) {
  this.password = crypto.pbkdf2Sync(password, config.application.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.isValidPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, config.application.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

export interface IUserDocument extends IUser, mongoose.Document {
  _id?: string,
  setPassword(password: string): void,
  isValidPassword(password: string): boolean,
}

UserSchema.pre<IUserDocument>('save', function (next) {
  try {
    this.setPassword(this.password);
    next()
  } catch (error) {
    next(error);
  }
});

export default UserSchema;



