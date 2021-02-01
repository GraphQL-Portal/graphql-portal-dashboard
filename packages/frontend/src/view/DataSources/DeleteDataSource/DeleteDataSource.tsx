import React from 'react';

import { useDeleteDataSource } from '../../../presenter/DataSources';
import {
  DialogText,
  DialogTitle,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, DELETE_DATA_SOURCE } from '../../Dialogs';
import { useStyles } from './useStyles';

export const DeleteDataSource: React.FC = () => {
  const { name, onSuccess, onCancel } = useDeleteDataSource();
  const { primaryButton } = useStyles();

  return (
    <ModalDialog id={DELETE_DATA_SOURCE}>
      <DialogTitle>Delete Data Source</DialogTitle>
      <DialogText>Do you really want to delete {name} data source</DialogText>
      <PrimaryButton fullWidth onClick={onSuccess} className={primaryButton}>
        Delete data-source
      </PrimaryButton>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </ModalDialog>
  );
};
