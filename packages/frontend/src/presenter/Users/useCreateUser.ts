import { useForm } from 'react-hook-form';
import vest, { test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { useDialogs } from '../../model/providers';
import { ROLE_ADMIN, ROLE_USER } from '../../model/providers/Auth/constants';
import enforce, { isCorrectPassword } from '../validation';

const suite = vest.create(
  'create_user',
  ({ email, password, confirmPassword }) => {
    test('email', 'Email is required', () => {
      enforce(email).isNotEmpty();
    });

    test('email', 'Please enter correct Email', () => {
      enforce(email).isEmail();
    });

    isCorrectPassword(password);

    test('confirmPassword', 'Passwords do not match', () => {
      enforce(confirmPassword).equals(password);
    });
  }
);

export const USER_ROLES = [
  { label: 'User', value: ROLE_USER },
  { label: 'Admin', value: ROLE_ADMIN },
];

const DEFAULT_CREATE_USER_STATE = {
  firstName: '',
  lastName: '',
  role: ROLE_USER,
  email: '',
  password: '',
  confirmPassword: '',
};

export const useCreateUser = () => {
  const { dialogConfig } = useDialogs()!;
  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: DEFAULT_CREATE_USER_STATE,
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
