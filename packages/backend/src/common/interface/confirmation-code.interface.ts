import ConfirmationCodeTypes from '../../modules/user/enum/confirmation-code-types.enum';

export default interface IConfirmationCode {
  email: string;
  code: string;
  type: ConfirmationCodeTypes;
  expiredAt: Date;
}
