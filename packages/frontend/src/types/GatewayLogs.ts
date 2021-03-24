export interface Log {
  nodeId: string;
  hostname: string;
  prefix: string;
  message: string;
  level: 'error' | 'info';
  timestamp: string;
}

export type UseGatewayLogsPresenter = () => {
  loading: boolean;
  data: Log[];
};
