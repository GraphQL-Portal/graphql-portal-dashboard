import React from 'react';
import { Input, PrimaryButton } from '../../../ui';
import { useSlackHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const SlackHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useSlackHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Authorization Token"
            required
            name="token"
            error={!!errors?.token}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
