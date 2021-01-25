import React from 'react';
import { Controller } from 'react-hook-form';

import { ErrorsAndControl as Props } from '../../../../types';
import { Input } from '../../../../ui';

const getError = (errors: any) => (field: string) =>
  !!(errors && errors[field]);

export const GraphQLHandler: React.FC<Props> = ({ control, errors }) => {
  const hasErrors = getError(errors);
  return (
    <>
      <Controller
        as={Input}
        control={control}
        label="endpoint"
        name="endpoint"
        error={hasErrors('endpoint')}
      />
    </>
  );
};
