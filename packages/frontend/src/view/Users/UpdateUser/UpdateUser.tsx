import React from 'react';
import { Controller } from 'react-hook-form';

import { USER_ROLES, useUpdateUser } from '../../../presenter/Users';
import {
  DialogTitle,
  Input,
  PrimaryButton,
  TextButton,
  Select
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
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Controller
          as={Input}
          control={control}
          className={formField}
          label="Email"
          name="email"
          disabled
          error={hasErrors('email')}
          fullWidth
        />
        <Controller
          as={Input}
          control={control}
          className={formField}
          label="First Name"
          name="firstName"
          error={hasErrors('firstName')}
          fullWidth
        />
        <Controller
          as={Input}
          control={control}
          className={formField}
          label="Last Name"
          name="lastName"
          error={hasErrors('lastName')}
          fullWidth
        />
        <Controller
            as={Select}
            control={control}
            name="role"
            options={USER_ROLES}
            labelId="role"
            label="Role"
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
