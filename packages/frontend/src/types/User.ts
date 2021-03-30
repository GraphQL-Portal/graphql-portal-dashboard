import { QueryHook } from './Apollo';
import { NOOP } from './General';
import { FormMethods, OnSubmit } from './HookForm';
import { UseTabsHook } from './Tabs';

export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type UsersList = {
  list: User[];
  onDelete: (index: number) => any;
  onBlock: (index: number) => any;
  onUnblock: (index: number) => any;
  onEdit: (index: number) => any;
};

export type Role = 'admin' | 'user' | '';

export type ProfileForm = FormMethods<User>;

export type UseProfileHook = () => Pick<
  ReturnType<QueryHook<User>>,
  'data' | 'loading' | 'refetch'
> &
  ReturnType<UseTabsHook> & {
    signOut: NOOP;
  };

export type ProfileGeneralTab = Pick<
  ReturnType<QueryHook<User>>,
  'data' | 'refetch'
>;

export type UseProfileGeneralHook = (
  args: ProfileGeneralTab
) => Pick<ProfileForm, 'register' | 'errors'> & {
  onSubmit: OnSubmit;
};

export type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordFormMethods = FormMethods<ChangePasswordForm>;

export type ProfilePasswordTab = Pick<ReturnType<QueryHook<User>>, 'refetch'>;

export type UseProfilePasswordTabHook = (
  args: ProfilePasswordTab
) => Pick<ChangePasswordFormMethods, 'errors' | 'register'> & {
  onSubmit: OnSubmit;
};
