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
  }, [accessToken, tour]);

  return (
    <ModalDialog id={START_TOUR}>
      <DialogTitle>Start Tour</DialogTitle>
      <DialogText>
        Do you want to start a quick start guide and create your first API?
      </DialogText>
      <PrimaryButton fullWidth onClick={onSuccess}>
        Start
      </PrimaryButton>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </ModalDialog>
  );
};
