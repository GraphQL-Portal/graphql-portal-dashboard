import { Request } from 'express';
import { MetricsChannels } from '@graphql-portal/types';

export default interface IGotRequest {
  event: MetricsChannels.GOT_REQUEST;
  nodeId: string;
  query: Record<string, unknown>;
  userAgent: string;
  ip: string;
  request: Request;
  date: number;
}
