import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { ApolloError } from '@apollo/client';
import vest, { test, enforce } from 'vest';

import { useAuth, useToast } from '../../model/providers';
import { useFormErrors } from '../../model/Hooks';
import { useLogin as login } from '../../model/Login/commands';
import { UA } from '../../model/providers/Auth/constants';
import { LoginForm, UseLoginHook } from '../../types';
import { isCorrectPassword, isEmail } from '../validation';

const suite = vest.create('login_form', ({ email, password }: LoginForm) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });

  test('email', 'Please enter correct Email', () => {
    isEmail(email);
  });

  isCorrectPassword(password);
});

const { NODE_ENV } = process?.env || {};
const isDevelopment = NODE_ENV === 'development';

const INITIAL_VALUES = isDevelopment
  ? {
      email: 'admin@example.com',
      password: 'Secret123!',
    }
  : {
      email: undefined,
      password: undefined,
    };

export const useLogin: UseLoginHook = () => {
  const { showErrorToast } = useToast();
  const { setAuth } = useAuth();
  const { handleSubmit, register, errors } = useForm<LoginForm>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: INITIAL_VALUES,
  });

  const handleLogin = (data: any) => setAuth(data.login);

  const handleError = (err: ApolloError) => showErrorToast(err.message);

  const { onLogin } = login({ onCompleted: handleLogin, onError: handleError });

  useFormErrors(errors);

  const onSubmit = ({ email, password }: LoginForm) => {
    onLogin({
      variables: {
        email,
        password,
        device: UA,
      },
    });
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
