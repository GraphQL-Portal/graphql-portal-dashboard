import { useRef, useEffect } from 'react';
import { useFieldArray, Control } from 'react-hook-form';

import {
  TriggersTable,
  AnyTable,
  SelectOption,
  SetValue,
  Watch,
} from '../../types';
import { useSources } from '../../model/DataSources/queries';

export const useDSPart = (
  control: Control,
  watch: Watch,
  setValue: SetValue,
  reset?: () => void
) => {
  const triggers = useRef<TriggersTable>({});
  const sourceTable = useRef<AnyTable>({});
  const { data, loading } = useSources();

  const {
    fields: sourceFields,
    append: addSource,
    remove: removeSource,
  } = useFieldArray({ control, name: 'sources' });

  useEffect(() => {
    const { trig, table } = data.reduce(
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
    if (reset) reset();
    return () => {
      triggers.current = {};
      sourceTable.current = {};
    };
  }, [data.length]);

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

  const options = data.reduce(
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
