import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { AdditionalResolverArguments as Props } from '../../../types';
import { ObjectArray } from '../../Form';

export const AdditionalResolverArguments: React.FC<Props> = ({
  nestIndex,
  control,
  errors,
  register,
}) => {
  const name = `mesh.additionalResolvers[${nestIndex}].args`;
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  return (
    <ObjectArray
      title="Arguments"
      fields={fields}
      onAdd={append}
      onRemove={remove}
      name={name}
      register={register}
      errors={errors}
    />
  );
};
