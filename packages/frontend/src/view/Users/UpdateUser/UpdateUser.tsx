import React from 'react';
import { Controller } from 'react-hook-form';

import { useUpdateUser } from '../../../presenter/Users';
import {
  DialogTitle,
  DialogText,
  Input,
  PrimaryButton,
  TextButton,
} from '../../../ui';
import { ModalDialog, UPDATE_USER } from '../../Dialogs';

import { useStyles } from './useStyles';

const getError = (errors: any) => (field: string) => !!errors?.[field];

export const UpdateUser: React.FC = () => {
  const { control, errors, onSubmit, onCancel } = useUpdateUser();
  const { formField, primaryButton } = useStyles();

  const hasErrors = getError(errors);

  return (
    <ModalDialog id={UPDATE_USER} onClose={onCancel}>
      <DialogTitle>Update user</DialogTitle>
      <DialogText>Enter new user email</DialogText>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Controller
          as={Input}
          control={control}
          className={formField}
          label="Email"
          name="email"
          error={hasErrors('email')}
          fullWidth
        />
        <PrimaryButton type="submit" fullWidth className={primaryButton}>
          Save
        </PrimaryButton>
      </form>
      <TextButton onClick={onCancel}>Cancel</TextButton>
    </ModalDialog>
  );
};
