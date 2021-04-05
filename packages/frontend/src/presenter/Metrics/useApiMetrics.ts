import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Range } from '../../types';
import { useCountryMetric, useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks, getDateRange } from '../../utils';

export const useApiMetrics = () => {
  const { id: apiDef } = useParams<{ id: string }>();
  const [range, setRange] = useState<Range>('hour');

  const { data } = useMetricsQuery(apiDef, getDateChunks(range));
  const { startDate, endDate } = useMemo(() => {
    return getDateRange(range);
  }, [range]);

  const { data: country } = useCountryMetric({
    variables: {
      startDate,
      endDate,
      filters: {
        apiDef,
      },
      limit: 5,
    },
  });

  const onSetRange = (newDateRange: Range) => setRange(newDateRange || 'hour');

  console.log('COUNTRY: ', country);

  return {
    data,
    range,
    onSetRange,
  };
};
