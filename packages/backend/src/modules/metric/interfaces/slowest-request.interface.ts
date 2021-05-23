import IReducedResolver from './reduced-resolver.interface';

export default interface ISlowestRequest {
  _id: string;
  latency: number;
  error: string | Error | null;
  nodeId: string;
  query: Record<string, unknown>;
  requestDate: string;
  responseDate: string;
  requestId: string;
  resolver: IReducedResolver;
  apiDef: string;
  apiName: string;
}
