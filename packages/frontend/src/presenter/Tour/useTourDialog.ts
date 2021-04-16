import { useDialogs } from '../../model/providers';

export const useTourDialog = () => {
  const { dialogConfig } = useDialogs()!;

  return dialogConfig;
};
