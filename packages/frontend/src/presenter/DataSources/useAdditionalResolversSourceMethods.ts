import { buildSchema } from 'graphql';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { DataSource } from '../../types';
import { nameToOptions } from '../../utils';

export const useAdditionalResolversSourceMethods = (
  control: any,
  name: string,
  sources: DataSource[],
  defaultSource?: string
) => {
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
    const source = sources.find((source) => source.name === watchTargetSource);
    if (!source) return;
    (async () => {
      const methods: string[] = [];
      const schema = await buildSchema(source.sourceSchema);
      [schema.getQueryType(), schema.getMutationType()].forEach((type) => {
        const fields = type?.getFields() || {};
        methods.push(...Object.keys(fields));
      });
      methods.sort();
      setTargetMethodOptions(methods.map(nameToOptions));
    })();
  }, [sources, watchTargetSource, setTargetMethodOptions]);

  return { targetMethodOptions };
};
