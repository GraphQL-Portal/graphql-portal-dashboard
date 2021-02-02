import { useForm } from 'react-hook-form';
import vest, { test, enforce } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';

import { useFormErrors } from '../../model/Hooks';
import { useDialogs } from '../../model/providers';

const suite = vest.create('update_user', ({ email }) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });
});

export const useUpdateUser = () => {
  const { dialogConfig } = useDialogs()!;

  const { handleSubmit, errors, control } = useForm({
    resolver: vestResolver(suite),
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: dialogConfig?.data?.email || 'lol'
    }
  });

  useFormErrors(errors);

  const onSubmit = (data: any) => {
    dialogConfig.onSuccess(data);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    email: dialogConfig?.data?.email,
  };
};
