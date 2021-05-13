import React from 'react';
import { Controller } from 'react-hook-form';

import { PrimaryButton, Input } from '../../../ui';
import { useAddDataSourceName } from '../../../presenter/DataSources';
import { NameStep } from '../../../types';
import { HandlerRow, HandlerCol } from '../Layout';
import { selectors } from '../../Tour';

export const SourceName: React.FC<NameStep> = (stepProps) => {
  const { onSubmit, register, errors } = useAddDataSourceName(stepProps);
  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            name="name"
            label="Data source name"
            required
            ref={register}
            fullWidth
            error={!!errors?.name}
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton
        data-tour={selectors.DATA_SOURCE_NAME_SAVE_BUTTON}
        type="submit"
      >
        Save Name
      </PrimaryButton>
    </form>
  );
};
