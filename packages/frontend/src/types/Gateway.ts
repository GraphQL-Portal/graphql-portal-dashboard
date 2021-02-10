export type Gateway = {
  nodeId: string;
  configTimestamp: number;
  lastPingAt: number;
  hostname: string;
  status: string;
};

export type GatewayNode = (string | number)[];

export type GatewayNodesList = {
  list: GatewayNode[];
};
