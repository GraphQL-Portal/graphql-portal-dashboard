import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';
import validator from 'validator';

import { useFormErrors } from '../../model/Hooks';
import { useDialogs } from '../../model/providers';

enforce.extend({ isEmail: validator.isEmail });

const suite = vest.create('update_user', ({ email }) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });

  test('email', 'Please enter correct Email', () => {
    enforce(email).isEmail();
  });
});

export const useUpdateUser = () => {
  const { dialogConfig } = useDialogs()!;

  console.count('update user render: ');
  console.log('CONFIG IS: ', dialogConfig);

  const { user = {}, onSuccess, onCancel } = dialogConfig!;

  const { handleSubmit, errors, control, reset } = useForm({
    resolver: vestResolver(suite),
    mode: 'onSubmit',
    defaultValues: {
      email: user.email || '',
    },
  });

  useFormErrors(errors);

  useEffect(() => {
    reset({ email: user.email });
  }, [user.email, reset]);

  return {
    onSubmit: handleSubmit(onSuccess),
    errors,
    control,
    onCancel,
    // email: user?.email || '',
  };
};
