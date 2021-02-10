import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, PrimaryButton } from '../../../ui';
import { useContentfulHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const ContentfulHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useContentfulHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Token"
            required
            name="token"
            error={hasErrors('token')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Endpoint"
            required
            name="endpoint"
            error={hasErrors('endpoint')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
