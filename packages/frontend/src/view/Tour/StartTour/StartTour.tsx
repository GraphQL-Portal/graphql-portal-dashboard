import React, { useEffect } from 'react';
import { useAuth } from '../../../model/providers';
import { getTour } from '../../../model/providers/Tour';

import { useTourDialog } from '../../../presenter/Tour';
import { useTour } from '../../../presenter/Tour/useTour';
import {
  DialogText,
  DialogTitle,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, START_TOUR } from '../../Dialogs';

export const StartTour: React.FC = () => {
  const { onOpenTourDialog } = useTour();
  const { accessToken } = useAuth();
  const tour = getTour();

  const { onSuccess, onCancel } = useTourDialog();

  useEffect(() => {
    if (!accessToken || tour) return;
    onOpenTourDialog();
  }, [accessToken, onOpenTourDialog, tour]);

  return (
    <ModalDialog id={START_TOUR}>
      <DialogTitle>Quick Tour</DialogTitle>
      <DialogText>
        Do you want to run a product tour and create your first API?
      </DialogText>
      <PrimaryButton fullWidth onClick={onSuccess}>
        Let's go
      </PrimaryButton>
      <TextButton onClick={() => onCancel()}>Cancel</TextButton>
      <TextButton onClick={() => onCancel(true)}>Don't show again</TextButton>
    </ModalDialog>
  );
};
