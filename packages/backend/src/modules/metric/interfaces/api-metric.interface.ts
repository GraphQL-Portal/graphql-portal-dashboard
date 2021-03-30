export default interface IAPIMetric {
  chunk: Date;
  avgLatency: number;
  count: number;
  successes: number;
  failures: number;
}
