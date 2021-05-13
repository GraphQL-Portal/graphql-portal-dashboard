import React from 'react';
import { Input, PrimaryButton } from '../../../ui';
import { useCrunchbaseHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const CrunchbaseHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useCrunchbaseHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="User Key"
            required
            name="userKey"
            error={!!errors?.userKey}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
