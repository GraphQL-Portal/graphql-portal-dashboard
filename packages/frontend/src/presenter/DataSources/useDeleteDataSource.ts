import { useDialogs } from '../../model/providers';

export const useDeleteDataSource = () => {
  const { dialogConfig } = useDialogs()!;

  return dialogConfig;
};
