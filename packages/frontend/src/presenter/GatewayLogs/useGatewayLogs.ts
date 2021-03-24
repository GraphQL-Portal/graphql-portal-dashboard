import { useGatewayLogs as useGatewayLogsQuery } from '../../model/GatewayLogs/queries';
import { UseGatewayLogsPresenter } from '../../types';

export const useGatewayLogs: UseGatewayLogsPresenter = () => {
  const { loading, data } = useGatewayLogsQuery({ pollInterval: 1000 });

  return {
    loading,
    data,
  };
};
