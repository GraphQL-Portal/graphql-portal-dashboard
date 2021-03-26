import { OnSubmit, FormMethods } from './HookForm';
import { Role } from './User';

export type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginForm = Omit<SignUpForm, 'confirmPassword'>;

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

export type ResetPasswordFormInput = Omit<SignUpForm, 'email'>;

export type ResetPasswordRequestFormInput = Pick<SignUpForm, 'email'>;
