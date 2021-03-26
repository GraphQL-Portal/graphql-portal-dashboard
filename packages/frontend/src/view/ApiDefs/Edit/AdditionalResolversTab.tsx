import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { useAdditionalResolver } from '../../../presenter/ApiDefs';
import { AdditionalResolvers } from '../Form';
import { useStyles } from './useStyles';
import { PrimaryButton } from '../../../ui';

export const AdditionalResolversTab: React.FC<Props> = (props) => {
  const {
    resolvers,
    onAddResolver,
    onRemoveResolver,
    onSubmit,
    register,
    errors,
    control,
  } = useAdditionalResolver(props);
  const { form } = useStyles();
  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <AdditionalResolvers
        resolvers={resolvers}
        onAddResolver={onAddResolver}
        onRemoveResolver={onRemoveResolver}
        register={register}
        errors={errors}
        control={control}
      />
      <PrimaryButton type="submit">Update additional resolvers</PrimaryButton>
    </form>
  );
};
