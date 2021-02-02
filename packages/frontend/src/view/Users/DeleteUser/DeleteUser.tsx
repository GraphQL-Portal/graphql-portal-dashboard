import React from 'react';

import { useDeleteUser } from '../../../presenter/Users';
import {
  DialogText,
  DialogTitle,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, DELETE_USER } from '../../Dialogs';

export const DeleteUser: React.FC = () => {
  const { email, onSuccess, onCancel } = useDeleteUser();

  return (
    <ModalDialog id={DELETE_USER}>
      <DialogTitle>Delete user</DialogTitle>
      <DialogText>Do you really want to delete user with email: {email}?</DialogText>
      <PrimaryButton fullWidth onClick={onSuccess}>
        Delete user
      </PrimaryButton>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </ModalDialog>
  );
};
