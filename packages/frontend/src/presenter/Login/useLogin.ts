import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test } from 'vest';
import enforce from 'vest/enforceExtended';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../../model/providers/Auth';

import { useFormErrors } from '../../hooks';
import { useToast } from '../../model/providers';

type LoginFormInput = {
  email: string;
  password: string;
};

const validationSuite = vest.create('login_form', ({ email, password }: LoginFormInput) => {
  test('email', 'Email is required', () => {
    enforce(email).isNotEmpty();
  });

  test('email', 'Please enter correct Email', () => {
    enforce(email).isEmail();
  });

  test('password', 'Password is required', () => {
    enforce(password).isNotEmpty();
  });

  test('password', 'Password must be at least 5 chars', () => {
    enforce(password).longerThanOrEquals(5);
  });

  test('password', 'Password must contain a digit', () => {
    enforce(password).matches(/[0-9]/);
  });

  test('password', 'Password must contain a symbol', () => {
    enforce(password).matches(/[^A-Za-z0-9]/);
  });
});

const LOGIN = gql`
  mutation login($email: String!, $password: String!, $device: String!) {
    login(email: $email, password: $password, device: $device) {
     accessToken,
     refreshToken,
    }
  }
`;

export const useLogin = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { handleSubmit, control, errors } = useForm<LoginFormInput>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
    defaultValues: {
      email: 'admin@admin.com',
      password: 'Secret123!',
    },
  });

  useFormErrors(errors);

  const { setAuth } = useAuth();

  const [login] = useMutation(LOGIN, {
    onError: (e) => showErrorToast(e.message),
  });

  const onSubmit = async ({ email, password }: LoginFormInput) => {
    const { data } = await login({
      variables: {
        email,
        password,
        device: window.navigator.userAgent
      }
    });

    setAuth(data.login);
    showSuccessToast('Successfully logged in');
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  }
}