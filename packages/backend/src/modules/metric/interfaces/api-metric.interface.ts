export default interface IAPIMetric {
  avgLatency: {
    chunk: Date;
    latency: number;
    count: number;
  }[];
}
