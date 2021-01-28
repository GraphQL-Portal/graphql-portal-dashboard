import moment from 'moment';
import { useEffect } from 'react';
import { useMetricsQuery } from '../../model/Metrics/queries';

export const useMetrics = (startDate: Date, endDate: Date, scale?: 'day' | 'month' | 'hour' | 'week') => {
  const { data, loading, error, refetch } = useMetricsQuery(startDate, endDate, scale);

  return {
    data,
    loading,
    refetch,
    error,
  };
};
