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
      title="Invalidate Operations"
      fields={fields}
      onAdd={append}
      onRemove={remove}
      name={name}
      register={register}
      errors={errors}
      keyLabel="operation"
      valueLabel="matchKey"
    />
  );
};
