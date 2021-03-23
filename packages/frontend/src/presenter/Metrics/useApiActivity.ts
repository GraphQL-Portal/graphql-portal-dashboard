import { useMemo } from 'react';
import { useHistory, generatePath } from 'react-router-dom';

import { useApiActivityQuery } from '../../model/Metrics/queries';
import { ROUTES } from '../../model/providers';
import { UseApiActivityHook } from '../../types';

const MILLISECONDS_IN_ONE_YEAR = 31536000000;

export const useApiActivity: UseApiActivityHook = () => {
  const { push } = useHistory();

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: Date.now() - MILLISECONDS_IN_ONE_YEAR,
      endDate: Date.now(),
    };
  }, []);

  const { data, loading } = useApiActivityQuery({
    variables: {
      filters: {
        startDate,
        endDate,
      },
    },
  });

  const onApiClick = (id: string) => () =>
    push(generatePath(`${ROUTES.API_METRICS}`, { id }));

  return {
    data,
    loading,
    onApiClick,
  };
};
