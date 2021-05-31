import { useState, useMemo } from 'react';

import { Range } from '../../types';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks, getDateRange } from '../../utils';

const COUNTRIES_LIMIT = 10;

export const useApiMetrics = (apiDef: string) => {
  const [range, setRange] = useState<Range>('hour');
  const { startDate, endDate } = useMemo(() => {
    return getDateRange(range);
  }, [range]);

  const { data } = useMetricsQuery({
    variables: {
      chunks: getDateChunks(range),
      filters: {
        apiDef,
      },
      slowestRequestsFilters: {
        apiDef,
        startDate,
        endDate,
      },
      countryFilters: {
        startDate,
        endDate,
        apiDef,
      },
      limit: COUNTRIES_LIMIT,
    },
  });

  const onSetRange = (newDateRange: Range) => setRange(newDateRange || 'hour');

  return {
    data,
    range,
    onSetRange,
  };
};
