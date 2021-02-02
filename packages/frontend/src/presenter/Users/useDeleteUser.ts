import { useDialogs } from '../../model/providers';

export const useDeleteUser = () => {
  const { dialogConfig } = useDialogs()!;

  return dialogConfig;
};
