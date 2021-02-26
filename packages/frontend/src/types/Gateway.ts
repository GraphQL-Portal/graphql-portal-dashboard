export type Gateway = {
  nodeId: string;
  configTimestamp: number;
  lastPingAt: number;
  hostname: string;
  status: string;
  listenHostname: string | null;
  listenPort: number | null;
  servername: string | null;
};

export type GatewayNodesList = {
  list: Gateway[];
};
