import { useGatewayLogs as useGatewayLogsQuery } from '../../model/GatewayLogs/queries';
import { UseGatewayLogsPresenter } from '../../types';

export const useGatewayLogs: UseGatewayLogsPresenter = () => {
  const { loading, data } = useGatewayLogsQuery({ pollInterval: 10000 });

  return {
    loading,
    data,
  };
};
