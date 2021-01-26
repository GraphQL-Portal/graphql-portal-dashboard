import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';
import validator from 'validator';
import { ROUTES, useToast } from '../../model/providers';
import { useFormErrors } from '../../model/Hooks';
import { useSignUp as signUp } from '../../model/SignUp/commands';
import { useHistory } from 'react-router-dom';

type SignUpFormInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

enforce.extend({ isEmail: validator.isEmail });

const validationSuite = vest.create('signup_form', ({ email, password, confirmPassword }: SignUpFormInput) => {
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
  test('confirmPassword', 'Passwords do not match', () => {
    enforce(confirmPassword).equals(password);
  });
});

export const useSignUp = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { push } = useHistory();
  const { handleSubmit, control, errors } = useForm<SignUpFormInput>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
  });


  const { onSignUp } = signUp({
    onCompleted: ({ register }: { register: boolean }) => {
      if (register) {
        showSuccessToast('Successfully created. Confirm your email address, please.');
        push(ROUTES.LOGIN);
      } else {
        showSuccessToast('Something went wrong. Try again later, please.');
      }
    },
    onError: (error: Error): void => showErrorToast(error.message),
  });

  useFormErrors(errors);

  const onSubmit = ({ email, password }: SignUpFormInput) => {
    onSignUp({
      variables: {
        data: {
          email,
          password,
        }
      },
    });
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
