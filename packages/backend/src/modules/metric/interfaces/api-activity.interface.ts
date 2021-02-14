export default interface IApiActivity {
  failed: number;
  success: number;
  latency: number;
  count: number;
  lastAccess: string;
  apiDef: string;
  apiName: string;
}
