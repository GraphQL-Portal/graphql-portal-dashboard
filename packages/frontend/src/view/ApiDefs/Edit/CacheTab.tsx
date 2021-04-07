import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { useCacheTransform } from '../../../presenter/ApiDefs';
import { CacheTransforms } from '../Form';
import { useStyles } from './useStyles';
import { PrimaryButton } from '../../../ui';

export const CacheTab: React.FC<Props> = (props) => {
  const {
    cache,
    onAddCache,
    onRemoveCache,
    onSubmit,
    register,
    errors,
    control,
  } = useCacheTransform(props);
  const { form } = useStyles();

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <CacheTransforms
        cache={cache}
        onAddCache={onAddCache}
        onRemoveCache={onRemoveCache}
        register={register}
        errors={errors}
        control={control}
      />
      <PrimaryButton type="submit">Update cache tranforms</PrimaryButton>
    </form>
  );
};
