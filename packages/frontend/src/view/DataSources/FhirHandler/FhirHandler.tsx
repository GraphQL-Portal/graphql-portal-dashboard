import React from 'react';
import { Checkbox, FormLabel, Input, PrimaryButton } from '../../../ui';
import { useFhirHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';
import { Controller } from 'react-hook-form';

export const FhirHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit, control } = useFhirHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="URL of an existing Fhir endpoint"
            required
            name="endpoint"
            error={hasErrors('endpoint')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Ignore self-signed certificate error"
            control={
              <Controller
                name="rejectUnauthorized"
                control={control}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
