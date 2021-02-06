import Roles from '../enum/roles.enum';

export default interface IUpdateUser {
  firstName: string;
  lastName: string;
  role: Roles;
}
