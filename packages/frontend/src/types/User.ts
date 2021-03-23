import { QueryHook } from './Apollo';
import { NOOP } from './General';
import { FormMethods, OnSubmit } from './HookForm';

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
  'data' | 'loading'
> &
  Pick<ProfileForm, 'register' | 'errors'> & {
    onSubmit: OnSubmit;
    signOut: NOOP;
  };
