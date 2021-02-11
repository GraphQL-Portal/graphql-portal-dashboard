import moment from 'moment';
import { useState, useMemo } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { useApiActivityQuery } from '../../model/Metrics/queries';
import { ROUTES } from '../../model/providers';

export const useApiActivity = () => {
  type DateRange = 'day' | 'week' | 'month' | 'year';
  const { push } = useHistory();
  const [dateRange, setDateRange] = useState('year' as DateRange);

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: moment().add(-1, dateRange).toDate(),
      endDate: moment().toDate(),
    };
  }, [dateRange]);

  const { data, loading } = useApiActivityQuery(startDate, endDate);

  const onApiClick = (id: string) =>
    push(generatePath(`${ROUTES.API_METRICS}`, { id }));

  return {
    data,
    loading,
    dateRange,
    onApiClick,
    setDateRange,
  };
};
