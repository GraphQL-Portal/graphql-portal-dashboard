import React from 'react';

import { useDeleteDataSource } from '../../../presenter/DataSources';
import {
  DialogText,
  DialogTitle,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, DELETE_API } from '../../Dialogs';
import { useStyles } from './useStyles';

export const DeleteAPI: React.FC = () => {
  const { name, onSuccess, onCancel } = useDeleteDataSource();
  const { primaryButton } = useStyles();

  return (
    <ModalDialog id={DELETE_API}>
      <DialogTitle>Delete API</DialogTitle>
      <DialogText>Do you really want to delete {name} API</DialogText>
      <PrimaryButton fullWidth onClick={onSuccess} className={primaryButton}>
        Delete API
      </PrimaryButton>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </ModalDialog>
  );
};
