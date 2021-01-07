import Roles from '../enum/roles.enum';

export default interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  role: Roles;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
