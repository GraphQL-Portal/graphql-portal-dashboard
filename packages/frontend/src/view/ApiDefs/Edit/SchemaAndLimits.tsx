import React from 'react';
import { useUpdateSchemaAndLimits } from '../../../presenter/ApiDefs';

import { EditApiTab as Props } from '../../../types';
import { PrimaryButton } from '../../../ui';
import { SchemaForm, LimitsForm } from '../Form';
import { useStyles } from './useStyles';

export const SchemaAndLimits: React.FC<Props> = (props) => {
  const { form } = useStyles();
  const { onSubmit, register, errors, control } = useUpdateSchemaAndLimits(
    props
  );
  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <SchemaForm control={control} errors={errors} register={register} />
      <LimitsForm register={register} errors={errors} />
      <PrimaryButton type="submit">Update Schema and Limits</PrimaryButton>
    </form>
  );
};
