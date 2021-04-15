import { buildSchema } from 'graphql';
import React, { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { DataSource } from '../../../types';
import { Select } from '../../../ui';
import { nameToOptions } from '../../../utils/nameToOptions';

export const AdditionalResolversSourceMethods: React.FC<{
  control: any;
  name: string;
  sources: DataSource[];
  defaultValue: string | undefined;
  defaultSource: string | undefined;
}> = ({ control, name, sources, defaultValue, defaultSource }) => {
  const watchTargetSource = useWatch({
    control,
    name: name.replace('.targetMethod', '.targetSource'),
    defaultValue: defaultSource || '',
  });

  const [targetMethodOptions, setTargetMethodOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (!sources) return;
    const source = sources.find(source => source.name === watchTargetSource);
    if (!source) return;
    (async () => {
      const methods: string[] = [];
      const schema = await buildSchema(source.sourceSchema);
      [schema.getQueryType(), schema.getMutationType()].forEach(type => {
        const fields = type?.getFields() || {};
        methods.push(...Object.keys(fields));
      });
      methods.sort();
      setTargetMethodOptions(methods.map(nameToOptions));
    })();
  }, [watchTargetSource, setTargetMethodOptions]);

  if (!targetMethodOptions.length) {
    return <></>;
  }

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
