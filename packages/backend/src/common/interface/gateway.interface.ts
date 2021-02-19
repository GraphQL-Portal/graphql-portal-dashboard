export default interface IGateway {
  nodeId: string;
  lastPingAt: number;
  configTimestamp: number;
  hostname: string;
  status: 'active' | 'idle';
  listenHostname: string;
  listenPort: number;
  servername?: string;
}
