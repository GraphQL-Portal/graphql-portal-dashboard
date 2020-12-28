import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test } from 'vest';
import enforce from 'vest/enforceExtended';

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

export const useLogin = () => {
  const { handleSubmit, control, errors } = useForm<LoginFormInput>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: LoginFormInput) => {
    console.log('EMAIL IS: ', email);
    console.log('PASSWORD IS: ', password);
    // @TODO send request to the server
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  }
}
