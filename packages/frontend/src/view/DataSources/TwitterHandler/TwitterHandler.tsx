import React from 'react';

import { Input, PrimaryButton } from '../../../ui';
import { useTwitterHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const TwitterHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useTwitterHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
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
