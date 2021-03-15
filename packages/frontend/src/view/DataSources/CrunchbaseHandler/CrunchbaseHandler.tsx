import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, PrimaryButton } from '../../../ui';
import { useCrunchbaseHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const CrunchbaseHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useCrunchbaseHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="User Key"
            required
            name="userKey"
            error={hasErrors('userKey')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
