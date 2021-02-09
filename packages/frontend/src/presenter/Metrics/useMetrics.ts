import moment from 'moment';
import { useEffect, useState } from 'react';
import { useMetricsQuery } from '../../model/Metrics/queries';

type Scale = 'hour' | 'day' | 'week' | 'month';
export const useMetrics = () => {
  const [startDate, setStartDate] = useState(moment().add(-25, 'day').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [scale, setScale] = useState('day' as Scale);

  const { data, loading, error, refetch } = useMetricsQuery(
    startDate,
    endDate,
    scale
  );

  useEffect(() => {
    let data = { startDate: startDate, endDate: endDate, scale };
    if (scale === 'hour') {
      data = {
        startDate: startDate,
        endDate: moment(startDate).add(1, 'day').toDate(),
        scale,
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
