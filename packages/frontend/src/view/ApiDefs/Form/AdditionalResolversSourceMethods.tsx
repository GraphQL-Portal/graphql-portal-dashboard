import React from 'react';
import { Controller } from 'react-hook-form';

import { useAdditionalResolversSourceMethods } from '../../../presenter/DataSources';
import { DataSource } from '../../../types';
import { Select } from '../../../ui';

export const AdditionalResolversSourceMethods: React.FC<{
  control: any;
  name: string;
  sources: DataSource[];
  defaultValue: string | undefined;
  defaultSource: string | undefined;
}> = ({ control, name, sources, defaultValue, defaultSource }) => {
  const { targetMethodOptions } = useAdditionalResolversSourceMethods(
    control,
    name,
    sources,
    defaultSource
  );

  if (!targetMethodOptions.length) return null;

  return (
    <Controller
      as={Select}
      name={name}
      control={control}
      options={targetMethodOptions}
      label="Target Method"
      fullWidth
      defaultValue={defaultValue}
      required
    />
  );
};
