import { useForm } from 'react-hook-form';
import vest, { enforce, test } from 'vest';
import { vestResolver } from '@hookform/resolvers/vest';
import { useToast } from '../../model/providers';
import { useChangePassword } from '../../model/Users/commands';
import {
  AError,
  ChangePasswordForm,
  UseProfilePasswordTabHook,
} from '../../types';
import { useFormErrors } from '../../model/Hooks';

const suite = vest.create(
  'change_password_form',
  ({ oldPassword, newPassword, confirmPassword }: ChangePasswordForm) => {
    test('oldPassword', 'Old password is required', () => {
      enforce(oldPassword).isNotEmpty();
    });
    test('newPassword', 'New password is required', () => {
      enforce(newPassword).isNotEmpty();
    });
    test('confirmPassword', 'Confirm password is required', () => {
      enforce(confirmPassword).isNotEmpty();
    });
    test(
      'newPassword',
      'The new password must be different from the old one',
      () => {
        enforce(newPassword).notEquals(oldPassword);
      }
    );
    test('newPassword', 'Password must be at least 8 chars', () => {
      enforce(newPassword).longerThanOrEquals(8);
    });
    test('newPassword', 'Password must contain a digit', () => {
      enforce(newPassword).matches(/[0-9]/);
    });
    test('newPassword', 'Password must contain a symbol', () => {
      enforce(newPassword).matches(/[^A-Za-z0-9]/);
    });
    test('confirmPassword', 'Passwords do not match', () => {
      enforce(confirmPassword).equals(newPassword);
    });
  }
);

export const useProfilePasswordTab: UseProfilePasswordTabHook = ({
  refetch,
}: any) => {
  const { showErrorToast, showSuccessToast } = useToast();
  const [changePassword] = useChangePassword({
    onCompleted() {
      refetch();
      showSuccessToast('Your profile has been updated');
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, register, errors } = useForm<ChangePasswordForm>({
    defaultValues: {
      oldPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
    resolver: vestResolver(suite),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useFormErrors(errors);

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordForm) => {
    changePassword({
      variables: {
        oldPassword,
        newPassword,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
  };
};
