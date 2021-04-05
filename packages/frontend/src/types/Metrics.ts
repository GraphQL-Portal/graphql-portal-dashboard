import { QueryHook } from './Apollo';
import { NOOP } from './General';

export type Scale = 'hour' | 'day' | 'week' | 'month';
export const RangeList = ['hour', 'day', 'week', 'month'] as const;
export type Range = typeof RangeList[number];

export type DateRange = Omit<Scale, 'hour'> | 'year';

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

export type FullApiMetric = {
  getChunkedAPIMetrics: ApiMetric[];
  getCountryMetrics: CountryMetric[];
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
