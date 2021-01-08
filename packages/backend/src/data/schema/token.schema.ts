import * as mongoose from 'mongoose';
import IToken from '../../common/interface/token.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
const TokenSchema = new mongoose.Schema(
  {
    device: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export interface ITokenDocument extends IToken, mongoose.Document {
  _id?: string;
}

export default TokenSchema;
