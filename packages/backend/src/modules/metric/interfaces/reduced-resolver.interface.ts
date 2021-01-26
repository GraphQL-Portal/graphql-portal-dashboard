export default interface IReducedResolver {
  path: string;
  source: string;
  info: any;
  args: any;
  result: any;
  latency: number;
  error: Error | string;
  calledAt: number;
  doneAt: number;
  errorAt: number;
}
