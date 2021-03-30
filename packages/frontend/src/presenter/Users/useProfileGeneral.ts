import { useForm } from 'react-hook-form';
import { useToast } from '../../model/providers';
import { useUpdateUser } from '../../model/Users/commands';
import { AError, UseProfileGeneralHook, User } from '../../types';
import { useEffect } from 'react';

export const useProfileGeneral: UseProfileGeneralHook = ({
  data,
  refetch,
}: any) => {
  const { showErrorToast, showSuccessToast } = useToast();

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
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
