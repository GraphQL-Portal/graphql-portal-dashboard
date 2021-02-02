import React from 'react';
import { Controller } from 'react-hook-form';

import { useUpdateUser } from '../../../presenter/Users';
import {
  Input,
  PrimaryButton,
} from '../../../ui';
import { HandlerRow, HandlerCol } from '../../DataSources/Layout';
import { getError } from '../../DataSources/helpers';
import { ModalDialog, UPDATE_USER } from '../../Dialogs';

export const UpdateUser: React.FC = () => {
  const {
    control,
    errors,
    onSubmit,
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
