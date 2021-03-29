import { useState, useMemo } from 'react';
import { Range } from '../../types';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useMetricsQuery } from '../../model/Metrics/queries';
import { getDateChunks } from '../../utils/getDateChunks';

export const useMetrics = () => {
  const [range, setRange] = useState('hour' as Range);
  const [apiDef, selectApiDef] = useState('');
  const { data: myApis } = useApiDefs();

  const apis = useMemo(() => {
    return myApis
      .map(({ name, _id }: { name: string; _id: string }) => ({
        value: _id,
        label: name,
      }))
      .concat({
        value: '',
        label: 'All APIs',
      });
  }, [myApis]);

  const { data, loading, error, refetch } = useMetricsQuery(
    apiDef,
    getDateChunks(range)
  );

  return {
    data,
    loading,
    error,
    refetch,
    range,
    setRange,
    apis,
    selectApiDef,
    apiDef,
  };
};

// export const useMetrics = () => {
//   const [startDate, setStartDate] = useState(addDays(new Date(), -25));
//   const [endDate, setEndDate] = useState(new Date());
//   const [scale, setScale] = useState('day' as Scale);
//   const [apiDef, selectApiDef] = useState(undefined);
//   const { data: myApis } = useApiDefs();
//
//   const apis = useMemo(() => {
//     return myApis
//       .map(({ name, _id }: { name: string; _id: string }) => ({
//         value: _id,
//         label: name,
//       }))
//       .concat({
//         value: '',
//         label: 'All APIs',
//       });
//   }, [myApis]);
//
//   const { data, loading, error, refetch } = useMetricsQuery(
//     apiDef,
//     startDate,
//     endDate,
//     scale
//   );
//
//   useEffect(() => {
//     let data = { startDate: startDate, endDate: endDate, scale, apiDef };
//     if (scale === 'hour') {
//       data = {
//         ...data,
//         endDate: addDays(startDate, 1),
//       };
//     }
//     refetch(data);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [startDate, endDate, scale]);
//
//   return {
//     data,
//     loading,
//     refetch,
//     error,
//     startDate,
//     endDate,
//     scale,
//     setStartDate,
//     setEndDate,
//     setScale,
//     apis,
//     selectApiDef,
//   };
// };
