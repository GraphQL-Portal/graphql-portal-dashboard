import { useRef, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import {
  TriggersTable,
  AnyTable,
  SelectOption,
  UseDSPartHook,
} from '../../types';
import { useSources } from '../../model/DataSources/queries';
import { createDataSourceList } from '../DataSources/helpers';

export const useDSPart: UseDSPartHook = ({
  control,
  watch,
  setValue,
  reset,
}) => {
  const triggers = useRef<TriggersTable>({});
  const sourceTable = useRef<AnyTable>({});
  const { data, loading } = useSources();

  const added = createDataSourceList(data);

  const {
    fields: sourceFields,
    append: addSource,
    remove: removeSource,
  } = useFieldArray({ control, name: 'sources' });

  useEffect(() => {
    const { trig, table } = added.reduce(
      (acc: { trig: TriggersTable; table: AnyTable }, source: any) => {
        const { name } = source;
        acc.trig[name] = false;
        acc.table[name] = source;
        return acc;
      },
      { trig: {}, table: {} }
    );
    triggers.current = trig;
    sourceTable.current = table;
    if (reset && typeof reset === 'function') reset();
    return () => {
      triggers.current = {};
      sourceTable.current = {};
    };
  }, [added, reset]);

  const source = watch('source');

  const onAddSource = () => {
    if (!!source) {
      setValue('source', '');
      triggers.current[source] = true;
      addSource({ value: source });
    }
  };

  const onRemoveSource = (idx: number) => () => {
    triggers.current[sourceFields[idx].value] = false;
    removeSource(idx);
  };

  const options = added.reduce(
    (acc: SelectOption[], { name }: any) => {
      return triggers.current[name]
        ? acc
        : acc.concat({ label: name, value: name });
    },
    [{ label: '-', value: '' }]
  );

  const connected =
    Object.keys(sourceTable.current).length > 0
      ? sourceFields.map(
          ({ value }: Record<string, string>) => sourceTable.current[value]
        )
      : [];

  return {
    options,
    connected,
    sourceFields,
    onRemoveSource,
    onAddSource,
    sourceTable,
    loading,
  };
};
