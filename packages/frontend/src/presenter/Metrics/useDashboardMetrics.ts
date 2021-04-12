import { useState, useMemo, ChangeEvent, ReactNode } from 'react';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useApiMetrics } from './useApiMetrics';

const ALL_APIS = 'All APIs';

export const useDashboardMetrics = () => {
  const [apiDef, selectApiDef] = useState<string>(ALL_APIS);
  const { data: myApis } = useApiDefs();

  const apis = useMemo(() => {
    return [
      {
        value: ALL_APIS,
        label: ALL_APIS,
      },
    ].concat(
      myApis.map(({ name, _id }: { name: string; _id: string }) => ({
        value: _id,
        label: name,
      }))
    );
  }, [myApis]);

  const { data, range, onSetRange } = useApiMetrics(
    apiDef === ALL_APIS ? '' : apiDef
  );

  const onSelectChange = (
    {
      target: { value },
    }: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    _: ReactNode
  ) => {
    selectApiDef(value as string);
  };

  return {
    data,
    range,
    onSetRange,
    apis,
    apiDef,
    onSelectChange,
  };
};
