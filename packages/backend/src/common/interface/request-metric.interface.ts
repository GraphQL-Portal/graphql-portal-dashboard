import { Request } from 'express';
import { IReducedResolver } from '../../modules/metric/interfaces';

export default interface IRequestMetric {
  requestId: string;
  nodeId: string;
  query: string;
  userAgent: string;
  ip: string
  resolvers: IReducedResolver[],
  request: Request,
  rawResponseBody: string,
  contentLength: number,
  error: Error | string | null,
  requestDate: Date;
  responseDate: Date;
  latency: number,
}
