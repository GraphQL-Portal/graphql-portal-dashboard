import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { CacheTransformsInvalidateOperations as Props } from '../../../types';
import { ObjectArray } from '../../Form';

export const CacheTransformsInvalidateOperations: React.FC<Props> = ({
  nestIndex,
  control,
  errors,
  register,
}) => {
  const name = `cache[${nestIndex}].invalidate.effectingOperations`;
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  return (
    <ObjectArray
      title="Invalidation rules"
      fields={fields}
      onAdd={append}
      onRemove={remove}
      name={name}
      register={register}
      errors={errors}
      keyLabel="operation"
      valueLabel="matchKey"
      keyHelperText="Operation name (i.e. Mutation.createUser) which will trigger the invalidation"
      valueHelperText="Must match the Cache key which should be invalidated"
    />
  );
};
