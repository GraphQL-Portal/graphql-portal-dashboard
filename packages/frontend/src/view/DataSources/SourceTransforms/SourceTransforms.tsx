import React from 'react';
import { Controller } from 'react-hook-form';

import { useTransforms } from '../../../presenter/DataSources';
import { TransformsStep } from '../../../types';
import { Select, OutlineButton } from '../../../ui';
import { HandlerRow, HandlerCol } from '../Layout';

export const SourceTransforms: React.FC<TransformsStep> = () => {
  const { transforms, control, fields, onAddTransform } = useTransforms();

  console.log('TRANSFORMS LIST: ', fields);
  return (
    <>
      <form noValidate autoComplete="off" onSubmit={onAddTransform}>
        <HandlerRow>
          <HandlerCol>
            <Controller
              as={Select}
              control={control}
              name="transform"
              options={transforms}
              labelId="transform"
              label="Choose transform to add"
              fullWidth
            />
          </HandlerCol>
          <HandlerCol>
            <OutlineButton type="submit" size="large">
              Add transform
            </OutlineButton>
          </HandlerCol>
        </HandlerRow>
      </form>
    </>
  );
};
