import * as mongoose from 'mongoose';
import uuid from 'uuid';
import IConfirmationCode from '../../common/interface/confirmation-code.interface';
import ConfirmationCodeTypes from '../../modules/user/enum/confirmation-code-types.enum';

const confirmationCodeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: (): string => uuid.v4(),
    },
    type: {
      type: String,
      enum: Object.values(ConfirmationCodeTypes),
      required: true,
    },
    expiredAt: Date,
  },
  { versionKey: false, timestamps: true }
);

export interface IConfirmationCodeDocument extends IConfirmationCode, mongoose.Document { }

export default confirmationCodeSchema;
