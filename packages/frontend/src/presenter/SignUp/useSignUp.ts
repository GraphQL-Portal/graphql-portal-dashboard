import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';
import { useHistory } from 'react-router-dom';

import { ROUTES, useToast } from '../../model/providers';
import { useFormErrors } from '../../model/Hooks';
import { useSignUp as signUp } from '../../model/SignUp/commands';
import { SignUpForm } from '../../types';
import { isCorrectPassword, isEmail } from '../validation';

const validationSuite = vest.create(
  'signup_form',
  ({ email, password, confirmPassword }: SignUpForm) => {
    test('email', 'Email is required', () => {
      enforce(email).isNotEmpty();
    });
    test('email', 'Please enter correct Email', () => {
      isEmail(email);
    });

    isCorrectPassword(password);

    test('confirmPassword', 'Passwords do not match', () => {
      enforce(confirmPassword).equals(password);
    });
  }
);

export const useSignUp = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { push } = useHistory();
  const { handleSubmit, control, errors } = useForm<SignUpForm>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
  });

  const { onSignUp } = signUp({
    onCompleted: ({ register }: { register: boolean }) => {
      if (register) {
        showSuccessToast(
          'Successfully created. Confirm your email address, please.'
        );
        push(ROUTES.LOGIN);
      } else {
        showSuccessToast('Something went wrong. Try again later, please.');
      }
    },
    onError: (error: Error): void => showErrorToast(error.message),
  });

  useFormErrors(errors);

  const onSubmit = ({ email, password }: SignUpForm) => {
    onSignUp({
      variables: {
        data: {
          email,
          password,
        },
      },
    });
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
