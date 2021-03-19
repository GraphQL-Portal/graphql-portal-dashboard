import { add } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useApiMetricsQuery } from '../../model/Metrics/queries';
import { Scale } from '../../types';

export const useApiMetrics = () => {
  const { id: apiDef } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState(add(new Date(), { days: -25 }));
  const [endDate, setEndDate] = useState(new Date());
  const [scale, setScale] = useState('day' as Scale);

  const { data, loading, error, refetch } = useApiMetricsQuery(
    apiDef,
    startDate,
    endDate,
    scale
  );

  useEffect(() => {
    let data = { startDate, endDate, scale, apiDef };
    if (scale === 'hour') {
      data = {
        ...data,
        endDate: add(new Date(), { days: 1 }),
      };
    }
    refetch(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, scale]);

  return {
    data,
    loading,
    refetch,
    error,
    startDate,
    endDate,
    scale,
    setStartDate,
    setEndDate,
    setScale,
  };
};
