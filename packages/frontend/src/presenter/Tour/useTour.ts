import { ROUTES, useDialogs, useTourContext } from '../../model/providers';
import { START_TOUR } from '../../view/Dialogs';
import { useHistory } from 'react-router-dom';

export const useTour = () => {
  const { push } = useHistory();
  const { startTour } = useTourContext();

  const { onOpenDialog, onCloseDialog } = useDialogs()!;

  const onOpenTourDialog = () => {
    onOpenDialog(START_TOUR, {
      onSuccess: () => {
        push(ROUTES.DASHBOARD);
        onCloseDialog();
        startTour();
      },
      onCancel: onCloseDialog,
    });
  };

  return {
    onOpenTourDialog,
  };
};
