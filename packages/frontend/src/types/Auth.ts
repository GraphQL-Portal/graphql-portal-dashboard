import { OnSubmit, FormMethods } from './HookForm';
import { Role } from './User';

export type LoginForm = {
  email: string;
  password: string;
};

export type UseLoginHook = () => Pick<
  FormMethods<LoginForm>,
  'register' | 'errors'
> & { onSubmit: OnSubmit };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthContextShape = {
  setAuth(data: Tokens): void;
  signOut(): void;
  role: Role;
} & Tokens;
