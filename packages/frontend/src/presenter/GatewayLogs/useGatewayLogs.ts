import { useEffect, useRef, useState } from 'react';
import { useGatewayLogs as useGatewayLogsQuery } from '../../model/GatewayLogs/queries';
import { Log, UseGatewayLogsPresenter } from '../../types';

export const useGatewayLogs: UseGatewayLogsPresenter = () => {
  const pollingInterval = 10000;
  const [latestTimestamp, setLatestTimestamp] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  const [isInitialized, setInitilized] = useState(false);
  const { loading, data } = useGatewayLogsQuery({
    variables: { latestTimestamp },
  });
  const timeoutRef = useRef({});

  useEffect(() => {
    if (data.length) {
      setLogs((prev: Log[]) => [...data, ...prev]);
    }
  }, [data]);

  useEffect(() => {
    if (loading && !data.length && !logs.length) return setInitilized(false);
    return setInitilized(true);
  }, [data, loading]);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
    }

    timeoutRef.current = setInterval(() => {
      let newTimestamp = data?.[0]?.timestamp.toString();
      if (!newTimestamp || newTimestamp === latestTimestamp) {
        // increase timestamp for infinity loop
        setLatestTimestamp((+latestTimestamp + 1).toString());
      } else {
        setLatestTimestamp(newTimestamp);
      }
    }, pollingInterval);
  }, [latestTimestamp, data]);

  return {
    loading: !isInitialized,
    data: logs,
  };
};
