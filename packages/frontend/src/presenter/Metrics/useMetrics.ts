import { useState, useMemo, ChangeEvent, ReactNode } from 'react';
import { Range } from '../../types';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks } from '../../utils';

const ALL_APIS = 'All APIs';

export const useMetrics = () => {
  const [range, setRange] = useState<Range>('hour');
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

  const { data } = useMetricsQuery(
    apiDef === ALL_APIS ? '' : apiDef,
    getDateChunks(range)
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

  const onSetRange = (newDateRange: Range) => setRange(newDateRange || 'hour');

  return {
    data,
    range,
    onSetRange,
    apis,
    apiDef,
    onSelectChange,
  };
};
