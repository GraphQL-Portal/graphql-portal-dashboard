import { Request } from 'express';

export interface IResolverCalled {
  event: string,
  info: any,
  args: any,
  path: string,
  date: number
}

export interface IResolverDone extends IResolverCalled {
  result: any,
}

export interface IResolverError extends IResolverCalled {
  error: string,
}

export interface IResolver {
  path: string,
  ['resolver-called']: IResolverCalled,
  ['resolver-error']?: IResolverError,
  ['resolver-done']?: IResolverDone,
  latency: number,
}

export default interface IRequestMetric {
  requestId: string;
  nodeId: string;
  query: string;
  userAgent: string;
  ip: string
  resolvers: IResolver[],
  request: Request,
  rawResponseBody: string,
  contentLength: number,
  error: Error | string | null,
  requestDate: Date;
  responseDate: Date;
  latency: number,
}
