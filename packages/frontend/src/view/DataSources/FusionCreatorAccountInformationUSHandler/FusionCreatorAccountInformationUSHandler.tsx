import React from 'react';
import { Input, PrimaryButton } from '../../../ui';
import { useFusionCreatorAccountInformationUSHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const FusionCreatorAccountInformationUSHandler: React.FC<HandlerStep> = (
  props
) => {
  const {
    register,
    errors,
    onSubmit,
  } = useFusionCreatorAccountInformationUSHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Authorization header name"
            required
            name="authorizationHeader"
            error={!!errors.authorizationHeader}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
