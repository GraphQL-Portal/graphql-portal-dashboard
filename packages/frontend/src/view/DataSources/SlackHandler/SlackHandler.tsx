import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, PrimaryButton } from '../../../ui';
import { useSlackHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const SlackHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useSlackHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Token"
            name="token"
            error={hasErrors('token')}
            required
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
