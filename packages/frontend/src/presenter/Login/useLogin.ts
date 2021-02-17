import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';
import validator from 'validator';
import { useAuth } from '../../model/providers';

import { useFormErrors } from '../../model/Hooks';
// import { useToast } from '../../model/providers';
import { useLogin as login } from '../../model/Login/commands';
import { UA } from '../../model/providers/Auth/constants';
import { LoginForm, UseLoginHook } from '../../types';

enforce.extend({ isEmail: validator.isEmail });

const suite = vest.create('login_form', ({ email, password }: LoginForm) => {
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
});

const INITIAL_VALUES = {
  email: 'admin@example.com',
  password: 'Secret123!',
};

export const useLogin: UseLoginHook = () => {
  // const { showErrorToast } = useToast();
  const { setAuth } = useAuth();
  const { handleSubmit, register, errors } = useForm<LoginForm>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(suite),
    defaultValues: INITIAL_VALUES,
  });

  const handleLogin = (data: any) => {
    setAuth(data.login);
  };

  // @TODO use showErrorToast with message to show why error appeared
  const handleError = (err: any) => console.error(err);

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
