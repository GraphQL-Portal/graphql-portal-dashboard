import { QueryHook } from './Apollo';
import { NOOP } from './General';

export const RangeList = ['hour', 'day', 'week', 'month'] as const;
export type Range = typeof RangeList[number];

export type ApiMetric = {
  apiDef?: string;
  apiName?: string;
  lastAccess?: string;
  count?: number;
  failed?: number;
  success?: number;
  latency?: number;
};

export type CountryMetric = {
  country?: string;
  count?: number;
};

export type SlowestRequestMetric = {
  requestId: string;
  nodeId: string;
  query: Record<string, unknown> | null;
  userAgent: string;
  ip: string;
  resolvers: [Record<string, unknown> | null];
  request: Record<string, unknown> | null;
  geo: Record<string, unknown> | null;
  rawResponseBody: string;
  requestDate: string;
  responseDate: string;
  latency: number;
  contentLength: number;
  error: Error | Record<string, unknown> | string | null;
  apiName: string;
  apiDef: string;
  user: string;
};

export type FullApiMetric = {
  getChunkedAPIMetrics: ApiMetric[];
  getCountryMetrics: CountryMetric[];
  getSlowestRequests: SlowestRequestMetric[];
  getApiAndSourcesLatencies: Record<string, number>[];
};

export type CountryChart = {
  data: CountryMetric[];
};

export type UseApiActivityHook = () => Pick<
  ReturnType<QueryHook<ApiMetric[]>>,
  'data' | 'loading'
> & {
  onApiClick(apiDef: string): NOOP;
};

export type ApiActivityList = Omit<ReturnType<UseApiActivityHook>, 'loading'>;

export type ChartButton = { text: string; value: Range };
