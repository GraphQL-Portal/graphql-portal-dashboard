import { OnSubmit, FormMethods } from './HookForm';

export type LoginForm = {
  email: string;
  password: string;
};

export type UseLoginHook = () => Pick<
  FormMethods<LoginForm>,
  'register' | 'errors'
> & { onSubmit: OnSubmit };
