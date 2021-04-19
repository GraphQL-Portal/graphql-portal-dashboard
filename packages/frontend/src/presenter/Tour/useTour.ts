import { ROUTES, useDialogs, useTourContext } from '../../model/providers';
import { START_TOUR } from '../../view/Dialogs';
import { useHistory } from 'react-router-dom';

export const useTour = () => {
  const { push } = useHistory();
  const { startTour, dontShowTourAgain } = useTourContext();

  const { onOpenDialog, onCloseDialog } = useDialogs()!;

  const onOpenTourDialog = () => {
    onOpenDialog(START_TOUR, {
      onSuccess: () => {
        push(ROUTES.DASHBOARD);
        onCloseDialog();
        startTour();
      },
      onCancel: (dontShowAgain = false) => {
        if (dontShowAgain) dontShowTourAgain();
        onCloseDialog();
      },
    });
  };

  return {
    onOpenTourDialog,
  };
};
