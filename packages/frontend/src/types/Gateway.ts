export type Gateway = {
  nodeId?: string;
  configTimestamp?: number;
  lastPingAt?: number;
  hostname?: string;
  status?: string;
  listenHostname?: string;
  listenPort?: number;
  servername?: string;
};

export type GatewayNodesList = {
  list: Gateway[];
};
