import React from 'react';
import { Controller } from 'react-hook-form';

import { useUpdateUser } from '../../../presenter/Users';
import {
  Input,
  PrimaryButton,
} from '../../../ui';
import { HandlerRow, HandlerCol } from '../../DataSources/Layout';
import { ModalDialog, UPDATE_USER } from '../../Dialogs';

const getError = (errors: any) => (field: string) => !!errors?.[field];

export const UpdateUser: React.FC = () => {
  const {
    control,
    errors,
    onSubmit,
    email,
  } = useUpdateUser();

  const hasErrors = getError(errors);

  return (
    <ModalDialog id={UPDATE_USER}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <HandlerRow>
          <HandlerCol>
            <Controller
              as={Input}
              control={control}
              label="Email"
              value={email}
              name="email"
              error={hasErrors('email')}
              fullWidth
            />
          </HandlerCol>
        </HandlerRow>
        <PrimaryButton type="submit">Save</PrimaryButton>
      </form>
    </ModalDialog>
  );
};
