import { MetricsChannels } from '@graphql-portal/types';

export default interface IGotRequest {
  event: MetricsChannels.GOT_REQUEST,
  nodeId: string,
  query: any,
  userAgent: string,
  ip: string,
  request: Request,
  date: number,
}