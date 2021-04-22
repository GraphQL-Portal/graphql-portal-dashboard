import { useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import { useHistory } from 'react-router-dom';
import vest, { test, enforce } from 'vest';

import { ROUTES, useToast } from '../../model/providers';
import { useFormErrors } from '../../model/Hooks';
import { useResetPassword as resetPassword } from '../../model/ResetPassword/commands';
import { getQueryData } from '../../utils/getQueryString';
import { ResetPasswordFormInput } from '../../types';
import { isCorrectPassword } from '../validation';

const validationSuite = vest.create(
  'reset_password_request_form',
  ({ password, confirmPassword }: ResetPasswordFormInput) => {
    isCorrectPassword(password);

    test('confirmPassword', 'Passwords do not match', () => {
      enforce(confirmPassword).equals(password);
    });
  }
);

export const useResetPassword = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { push, location } = useHistory();

  const { code, email } = getQueryData(location.search);

  const { handleSubmit, control, errors } = useForm<ResetPasswordFormInput>({
    reValidateMode: 'onSubmit',
    resolver: vestResolver(validationSuite),
  });

  const { onResetPassword } = resetPassword({
    onCompleted: ({ resetPassword }: { resetPassword: boolean }) => {
      if (resetPassword) {
        showSuccessToast('Your password was changed successfully');
        push(ROUTES.LOGIN);
      } else {
        showSuccessToast('Something went wrong. Try again later, please.');
      }
    },
    onError: (error: Error): void => showErrorToast(error.message),
  });

  useFormErrors(errors);

  const onSubmit = ({ password }: ResetPasswordFormInput) => {
    onResetPassword({
      variables: {
        password,
        code,
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
