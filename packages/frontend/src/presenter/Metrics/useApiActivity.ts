import { add } from 'date-fns';
import { useState, useMemo } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { useApiActivityQuery } from '../../model/Metrics/queries';
import { ROUTES } from '../../model/providers';
import { DateRange } from '../../types';

export const useApiActivity = () => {
  const { push } = useHistory();
  const [dateRange, setDateRange] = useState('year' as DateRange);

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: add(new Date(), { [`${dateRange}s`]: -1 }),
      endDate: new Date(),
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
