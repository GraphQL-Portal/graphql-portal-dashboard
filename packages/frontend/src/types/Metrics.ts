import { QueryHook } from './Apollo';
import { NOOP } from './General';

export type Scale = 'hour' | 'day' | 'week' | 'month';
export type Range = 'hour' | 'day' | 'week' | 'month';

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

export type RequestChartProps = {
  data: any[];
  title?: string;
  argumentLabelHandler?: any;
  valueLabelHandler?: any;
};

export type MetricsRefetch = {
  apiDef: string | undefined;
  startDate: Date;
  endDate: Date;
  scale: Scale;
};

export type APIMetricsRefetch = {
  apiDef: string | undefined;
  chunks: Date[];
};

export type CountryChartProps = RequestChartProps;

export type FailureRequestRateChartProps = {
  data: {
    success: number;
    failure: number;
    argument: number;
  }[];
  title?: string;
  argumentLabelHandler?: Function;
  valueLabelHandler?: Function;
};

export type UseApiActivityHook = () => Pick<
  ReturnType<QueryHook<ApiMetric[]>>,
  'data' | 'loading'
> & {
  onApiClick(apiDef: string): NOOP;
};

export type ApiActivityList = Omit<ReturnType<UseApiActivityHook>, 'loading'>;
