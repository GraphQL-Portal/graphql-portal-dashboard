export default interface IApiActivity {
  failed: number;
  success: number;
  latency: number;
  count: number;
  apiDef: string;
}
