import moment from 'moment';
import { useEffect, useState, useMemo } from 'react';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { useApiDefs } from '../../model/ApiDefs/queries';

type Scale = 'hour' | 'day' | 'week' | 'month';
export const useMetrics = () => {
  const [startDate, setStartDate] = useState(moment().add(-25, 'day').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [scale, setScale] = useState('day' as Scale);
  const [apiDef, selectApiDef] = useState(undefined);
  const { data: myApis } = useApiDefs();

  const apis = useMemo(() => {
    const options = [{
      value: undefined,
      label: 'All APIs'
    }];
    return myApis.map(({ name, _id }: { name: string, _id: string }) => ({ value: _id, label: name })).concat(options);
  }, [myApis]);

  const { data, loading, error, refetch } = useMetricsQuery(apiDef, startDate, endDate, scale);

  useEffect(() => {
    let data = { startDate: startDate, endDate: endDate, scale, apiDef };
    if (scale === 'hour') {
      data = {
        ...data,
        endDate: moment(startDate).add(1, 'day').toDate(),
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
    apis,
    selectApiDef,
  };
};
