export default interface IToken {
  _id?: string;
  device: string;
  token: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}
