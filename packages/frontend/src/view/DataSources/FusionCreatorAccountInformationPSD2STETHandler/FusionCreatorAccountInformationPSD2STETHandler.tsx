import React from 'react';
import { Input, PrimaryButton } from '../../../ui';
import { useFusionCreatorAccountInformationPSD2STETHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const FusionCreatorAccountInformationPSD2STETHandler: React.FC<HandlerStep> = (
  props
) => {
  const {
    onSubmit,
    errors,
    register,
  } = useFusionCreatorAccountInformationPSD2STETHandler(props);

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
