export default interface IMetric {
  latency: {
    argument: string;
    value: number;
  }[];
  count: {
    argument: string;
    value: number;
  }[];
  countries: {
    argument: string;
    value: number;
  }[];
  failures: {
    argument: string;
    success: number;
    failure: number;
  }[];
}
