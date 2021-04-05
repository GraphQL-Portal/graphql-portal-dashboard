import { useState, useMemo } from 'react';

import { Range } from '../../types';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks, getDateRange } from '../../utils';

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
      startDate,
      endDate,
      limit: 10,
    },
  });

  const onSetRange = (newDateRange: Range) => setRange(newDateRange || 'hour');

  return {
    data,
    range,
    onSetRange,
  };
};
