import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';
import validator from 'validator';
import { ROUTES, useToast } from '../../model/providers';
import { useFormErrors } from '../../model/Hooks';
import { useResetPasswordRequest as resetPasswordRequest } from '../../model/ResetPasswordRequest/commands';
import { useHistory } from 'react-router-dom';

type ResetPasswordRequestFormInput = {
  email: string;
};

enforce.extend({ isEmail: validator.isEmail });

const validationSuite = vest.create(
  'reset_password_request_form',
  ({ email }: ResetPasswordRequestFormInput) => {
    test('email', 'Email is required', () => {
      enforce(email).isNotEmpty();
    });
    test('email', 'Please enter correct Email', () => {
      enforce(email).isEmail();
    });
  }
);

export const useResetPasswordRequest = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { push } = useHistory();
  const {
    handleSubmit,
    control,
    errors,
  } = useForm<ResetPasswordRequestFormInput>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
  });

  const { onResetPasswordRequest } = resetPasswordRequest({
    onCompleted: ({
      resetPasswordRequest,
    }: {
      resetPasswordRequest: boolean;
    }) => {
      if (resetPasswordRequest) {
        showSuccessToast(
          'Please, check your mailbox and follow confirmation instructions.'
        );
        push(ROUTES.LOGIN);
      } else {
        showSuccessToast('Something went wrong. Try again later, please.');
      }
    },
    onError: (error: Error): void => showErrorToast(error.message),
  });

  useFormErrors(errors);

  const onSubmit = ({ email }: ResetPasswordRequestFormInput) => {
    onResetPasswordRequest({
      variables: {
        email,
      },
    });
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
