import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Range } from '../../types';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks } from '../../utils/getDateChunks';

export const useApiMetrics = () => {
  const { id: apiDef } = useParams<{ id: string }>();
  const [range, setRange] = useState<Range>('hour');

  const { data, loading } = useMetricsQuery(apiDef, getDateChunks(range));

  const onSetRange = (newDateRange: Range) => setRange(newDateRange || 'hour');

  return {
    data,
    loading,
    range,
    onSetRange,
  };
};
