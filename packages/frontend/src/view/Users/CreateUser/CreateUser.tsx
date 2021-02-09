import React from 'react';
import { Controller } from 'react-hook-form';

import { useCreateUser, USER_ROLES } from '../../../presenter/Users';
import {
  Input,
  DialogTitle,
  PrimaryButton,
  Select,
  TextButton,
} from '../../../ui';
import { getError } from '../../DataSources/helpers';
import { ModalDialog, CREATE_USER } from '../../Dialogs';
import { useStyles } from './useStyles';

export const CreateUser: React.FC = () => {
  const { control, onSubmit, errors, onCancel } = useCreateUser();
  const { controller } = useStyles();
  const hasErrors = getError(errors);

  return (
    <>
      <ModalDialog id={CREATE_USER}>
        <DialogTitle>Create user</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <Controller
            as={Input}
            control={control}
            label="First Name"
            name="firstName"
            error={hasErrors('firstName')}
            fullWidth
            className={controller}
          />
          <Controller
            as={Input}
            control={control}
            label="Last Name"
            name="lastName"
            error={hasErrors('lastName')}
            className={controller}
            fullWidth
          />
          <Controller
            as={Input}
            control={control}
            label="Email (required)"
            name="email"
            error={hasErrors('email')}
            className={controller}
            fullWidth
          />
          <Controller
            as={Input}
            control={control}
            type="password"
            name="password"
            label="Password (required)"
            error={hasErrors('password')}
            className={controller}
            fullWidth
          />
          <Controller
            as={Input}
            control={control}
            label="Confirm Password (required)"
            name="confirmPassword"
            type="password"
            error={hasErrors('confirmPassword')}
            InputProps={{ autoComplete: 'off' }}
            className={controller}
            fullWidth
          />
          <Controller
            as={Select}
            control={control}
            name="role"
            options={USER_ROLES}
            className={controller}
            labelId="role"
            label="Role"
            fullWidth
          />
          <PrimaryButton fullWidth type="submit">
            Create
          </PrimaryButton>
        </form>
        <TextButton onClick={onCancel} type="reset">
          Cancel
        </TextButton>
      </ModalDialog>
    </>
  );
};
