import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { ArgsTypeMap as Props } from '../../../types';
import { ObjectArray } from '../../Form';

const OBJECT_SCHEMA = {
  key: {
    label: 'Argument Name',
    helperText: '',
  },
  value: {
    label: 'Argument Type',
    helperText: '',
  },
};

export const ArgsTypeMap: React.FC<Props> = ({
  name,
  control,
  errors,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name });

  const onAdd = () => append({ key: '', value: '' });

  return (
    <ObjectArray
      title="Arguments Type Mapping"
      fields={fields}
      onAdd={onAdd}
      onRemove={remove}
      name={name}
      register={register}
      errors={errors}
      objectSchema={OBJECT_SCHEMA}
    />
  );
};
