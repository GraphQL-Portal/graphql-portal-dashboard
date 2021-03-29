import React from 'react';

import { PrimaryButton } from '../../../ui';
import { EditApiTab as Props } from '../../../types';
import { useUpdateIPFiltering } from '../../../presenter/ApiDefs';
import { IPForm } from '../Form';
import { useStyles } from './useStyles';

export const IPTab: React.FC<Props> = (props) => {
  const { form } = useStyles();
  const {
    onSubmit,
    control,
    errors,
    register,
    enableIPFiltering,
    allowedIP,
    addAllowedIP,
    removeAllowedIP,
    deniedIP,
    addDeniedIP,
    removeDeniedIP,
  } = useUpdateIPFiltering(props);
  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <IPForm
        register={register}
        control={control}
        errors={errors}
        enableIPFiltering={enableIPFiltering}
        allowedIP={allowedIP}
        addAllowedIP={addAllowedIP}
        removeAllowedIP={removeAllowedIP}
        deniedIP={deniedIP}
        addDeniedIP={addDeniedIP}
        removeDeniedIP={removeDeniedIP}
      />
      <PrimaryButton type="submit">Update Data Sources</PrimaryButton>
    </form>
  );
};
