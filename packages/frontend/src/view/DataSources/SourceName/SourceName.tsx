import React from 'react';
import { Controller } from 'react-hook-form';

import { PrimaryButton, Input } from '../../../ui';
import { useAddDataSourceName } from '../../../presenter/DataSources';
import { NameStep } from '../../../types';
import { HandlerRow, HandlerCol } from '../Layout';

export const SourceName: React.FC<NameStep> = (stepProps) => {
  const { onSubmit, control, errors } = useAddDataSourceName(stepProps);
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            name="name"
            label="Data source name"
            required
            control={control}
            fullWidth
            error={!!(errors && errors.name)}
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Name</PrimaryButton>
    </form>
  );
};
