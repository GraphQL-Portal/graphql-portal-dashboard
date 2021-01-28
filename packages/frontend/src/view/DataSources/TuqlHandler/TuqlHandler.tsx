import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, PrimaryButton } from '../../../ui';
import { useTuqlHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const TuqlHandler: React.FC<HandlerStep> = (props) => {
  const { control, errors, onSubmit } = useTuqlHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Pointer to SQLite database"
            name="db"
            error={hasErrors('db')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Input}
            control={control}
            label="Path to the SQL Dump file"
            name="infile"
            error={hasErrors('infile')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
