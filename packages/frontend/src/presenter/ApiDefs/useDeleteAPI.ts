import { useDialogs } from '../../model/providers';

export const useDeleteAPI = () => {
  const { dialogConfig } = useDialogs()!;

  return dialogConfig;
};
