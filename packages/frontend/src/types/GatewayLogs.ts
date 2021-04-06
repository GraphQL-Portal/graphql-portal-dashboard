export interface Log {
  nodeId: string;
  hostname: string;
  prefix: string;
  message: string;
  level: LogLevel;
  timestamp: string;
}

export type UseGatewayLogsPresenter = () => {
  loading: boolean;
  data: Log[];
};

export enum LogLevel {
  info,
  error,
  debug,
  warn,
}
