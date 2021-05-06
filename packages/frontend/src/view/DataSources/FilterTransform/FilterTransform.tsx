import React from 'react';

import { OutlineButton, PrimaryButton, Select } from '../../../ui';
import { TransformStep as Props } from '../../../types';
import { useFilterTransform } from '../../../presenter/DataSources';
import { StringArray } from '../../Form';
import { HandlerCol, HandlerRow } from '../Layout';
import { useStyles } from './useStyles';
import { Controller } from 'react-hook-form';

const METHODS_OPTIONS = [
  {
    label: 'bare',
    value: 'bare',
  },
  {
    label: 'wrap',
    value: 'wrap',
  },
];

export const FilterTransform: React.FC<Props> = (props) => {
  const { onCancel } = props;
  const {
    onSubmit,
    register,
    errors,
    filters,
    onAddFilter,
    onRemoveFilter,
    control,
  } = useFilterTransform(props);
  const { cancelButton } = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <StringArray
        name="filters"
        title="Add Filters"
        fields={filters}
        onAdd={onAddFilter}
        onRemove={onRemoveFilter}
        register={register}
        errors={errors}
        valueLabel="Filter"
      />
      <HandlerRow>
        <HandlerCol>
          <Controller
            as={Select}
            control={control}
            name="mode"
            options={METHODS_OPTIONS}
            labelId="mode"
            label="Filtering Mode"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <OutlineButton onClick={onCancel} className={cancelButton}>
        Cancel
      </OutlineButton>
      <PrimaryButton type="submit">Add transform</PrimaryButton>
    </form>
  );
};
