import React from 'react';
import {
  DialogText,
  DialogTitle,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, DELETE_DATA_SOURCE } from '../../Dialogs';

export const DeleteDataSource: React.FC = () => {
  return (
    <ModalDialog id={DELETE_DATA_SOURCE}>
      <DialogTitle>Delete Data Source</DialogTitle>
      <DialogText>Do you really want to delete DataSource</DialogText>
      <PrimaryButton fullWidth>Delete data-source</PrimaryButton>
      <TextButton>Cancel</TextButton>
    </ModalDialog>
  );
};
