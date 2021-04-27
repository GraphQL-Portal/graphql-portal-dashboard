import validator from 'validator';
import { enforce } from 'vest';

enforce.extend({ isEmail: validator.isEmail });

export const isEmail = (email: string) => enforce(email).isEmail();
