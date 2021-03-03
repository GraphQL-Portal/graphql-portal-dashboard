import React from 'react';

import { Input, PrimaryButton } from '../../../ui';
import { useSalesforceHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';

export const SalesforceHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useSalesforceHandler(props);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="An endpoint of your Salesforce API"
            name="baseUrl"
            error={!!errors?.baseUrl}
            required
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
