import { useRef, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import {
  EditApiTab,
  TriggersTable,
  AnyTable,
  SelectOption,
  DataSource,
} from '../../types';
import { useSources } from '../../model/DataSources/queries';
import { useUpdateApiDef } from '../../model/ApiDefs/commands';

export const useUpdateDataSources = ({ api, refetch }: EditApiTab) => {
  const ref = useRef<TriggersTable>({});
  const ref2 = useRef<AnyTable>({});
  const {
    name,
    endpoint,
    authentication: { auth_header_name, auth_tokens },
    playground,
    _id: id,
    sources,
    enabled,
  } = api;

  const { data, loading } = useSources();
  const { updateApiDef } = useUpdateApiDef({ onCompleted: refetch });

  const { handleSubmit, control, watch, setValue, reset } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      source: '',
      sources: sources.map(({ name }: DataSource) => ({ value: name })),
    },
  });

  const {
    fields: sourceFields,
    append: addSource,
    remove: removeSource,
  } = useFieldArray({ control, name: 'sources' });

  useEffect(() => {
    const { triggers, table } = data.reduce(
      (acc: { triggers: TriggersTable; table: AnyTable }, source: any) => {
        const { name } = source;
        acc.triggers[name] =
          sourceFields.filter(
            ({ value }: Record<string, string>) => value === name
          ).length > 0;
        acc.table[name] = source;
        return acc;
      },
      { triggers: {}, table: {} }
    );
    ref.current = triggers;
    ref2.current = table;
    reset();
    return () => {
      ref.current = {};
      ref2.current = {};
    };
  }, [data.length]);

  const source = watch('source');

  const onAddSource = () => {
    if (!!source) {
      setValue('source', '');
      ref.current[source] = true;
      addSource({ value: source });
    }
  };

  const onRemoveSource = (idx: number) => () => {
    ref.current[sourceFields[idx].value] = false;
    removeSource(idx);
  };

  const options = data.reduce(
    (acc: SelectOption[], { name }: any) => {
      return ref.current[name] ? acc : acc.concat({ label: name, value: name });
    },
    [{ label: '-', value: '' }]
  );

  const connected = sourceFields.map(
    ({ value }: Record<string, string>) => ref2.current[value] || {}
  );

  const onSubmit = ({ sources }: any) => {
    updateApiDef({
      variables: {
        id,
        apiDef: {
          name,
          endpoint,
          playground,
          authentication: { auth_header_name, auth_tokens },
        },
        sources: sourceFields.map(
          ({ value }: Record<string, string>) => ref2.current[value]._id
        ),
        enabled,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    options,
    connected,
    onAddSource,
    onRemoveSource,
    loading,
  };
};
