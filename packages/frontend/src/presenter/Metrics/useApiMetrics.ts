import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useApiMetricsQuery } from '../../model/Metrics/queries';
import { ROUTES } from '../../model/providers';

type Scale = 'hour' | 'day' | 'week' | 'month';
export const useApiMetrics = () => {
  const { push } = useHistory();
  const { id: apiDef } = useParams<{ id: string }>();
  const [startDate, setStartDate] = useState(moment().add(-25, 'day').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [scale, setScale] = useState('day' as Scale);

  const { data, loading, error, refetch } = useApiMetricsQuery(
    apiDef,
    startDate,
    endDate,
    scale
  );

  useEffect(() => {
    let data = { startDate: startDate, endDate: endDate, scale, apiDef };
    if (scale === 'hour') {
      data = {
        apiDef,
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
    goBack: () => push(ROUTES.METRICS_AND_LOGS),
  };
};
