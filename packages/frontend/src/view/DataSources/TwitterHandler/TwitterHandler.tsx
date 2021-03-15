import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, PrimaryButton } from '../../../ui';
import { useTwitterHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const TwitterHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useTwitterHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Authorization Header"
            required
            name="authorization"
            error={hasErrors('authorization')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
