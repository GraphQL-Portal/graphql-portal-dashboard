import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { useDialogs } from '../../model/providers';
import { Roles } from '../../model/providers/Auth/constants';

const suite = vest.create('create_user', ({ email, password, confirmPassword }) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });

  test('email', 'Please enter correct Email', () => {
    enforce(email).isEmail();
  });

  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });

  test('password', 'Password must be at least 8 chars', () => {
    enforce(password).longerThanOrEquals(8);
  });

  test('password', 'Password must contain a digit', () => {
    enforce(password).matches(/[0-9]/);
  });

  test('password', 'Password must contain a symbol', () => {
    enforce(password).matches(/[^A-Za-z0-9]/);
  });
  test('confirmPassword', 'Passwords do not match', () => {
    enforce(confirmPassword).equals(password);
  });
});

export const USER_ROLES = [
  { label: 'User', value: Roles.USER },
  { label: 'Admin', value: Roles.ADMIN },
];

const DEFAUL_CREATE_USER_STATE = {
  firstName: '',
  lastName: '',
  role: USER_ROLES[0].value,
  email: '',
  password: '',
  confirmPassword: '',
}

export const useCreateUser = () => {
  const { dialogConfig } = useDialogs()!;
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: DEFAUL_CREATE_USER_STATE,
  });

  useFormErrors(errors);

  return {
    onSubmit: handleSubmit((data) => {
      dialogConfig.onSuccess({
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        password: data.password,
      });
    }),
    onCancel: dialogConfig.onCancel,
    errors,
    control,
  };
};
