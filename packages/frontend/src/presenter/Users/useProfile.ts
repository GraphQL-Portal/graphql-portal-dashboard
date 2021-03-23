import { useForm } from 'react-hook-form';
import { useAuth, useToast } from '../../model/providers';
import { useProfile as queryProfile } from '../../model/Users/queries';
import { useUpdateUser } from '../../model/Users/commands';
import { AError, UseProfileHook, User } from '../../types';
import { useEffect } from 'react';

export const useProfile: UseProfileHook = () => {
  const { signOut } = useAuth();
  const { showErrorToast, showSuccessToast } = useToast();

  const { data, loading, refetch } = queryProfile();
  const { _id: id, role, email, firstName, lastName } = data;

  const [updateProfile] = useUpdateUser({
    onCompleted() {
      refetch!();
      showSuccessToast('Your profile has been updated');
    },
    onError({ message }: AError) {
      showErrorToast(message);
    },
  });

  const { handleSubmit, register, errors, reset } = useForm<User>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      firstName,
      lastName,
      email,
    },
  });

  useEffect(() => {
    reset({ firstName, lastName, email });
  }, [firstName, lastName, email, reset]);

  const onSubmit = (data: User) => {
    updateProfile({
      variables: {
        id,
        data: {
          role,
          ...data,
        },
      },
    });
  };

  return {
    signOut,
    data,
    loading,
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
  };
};
