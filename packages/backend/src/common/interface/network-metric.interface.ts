export default interface INetworkMetric {
  nodeId: string;
  bytesIn: number;
  bytesOut: number;
  connections: number;
  recordedAt: number;
}
