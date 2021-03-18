import { useMemo } from 'react';
import { useGatewayLogs } from '../../model/GatewayLogs/queries';
import { LOGS_UPDATE } from '../../model/GatewayLogs/subscriptions';
import { Log } from '../../types';

export const useGatewayLogsWithSubscription = () => {
  const { loading, data, subscribeToMore } = useGatewayLogs();

  const subscribeToNewLogs = () =>
    subscribeToMore({
      document: LOGS_UPDATE,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data.logsUpdated) return prev;
        const newLog = subscriptionData.data.logsUpdated;
        return Object.assign({}, prev, {
          getLatestLogs: [...prev.getLatestLogs, newLog],
        });
      },
    });

  const list: Log[] = useMemo(() => {
    const copy = [...data];
    copy.sort((a: Log, b: Log) => +a.timestamp - +b.timestamp);
    return copy;
  }, [data.length]);

  return {
    loading,
    list,
    subscribeToNewLogs,
  };
};
