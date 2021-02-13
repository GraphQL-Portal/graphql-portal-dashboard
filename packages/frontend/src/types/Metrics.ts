export type Scale = 'hour' | 'day' | 'week' | 'month';

export type DateRange = Omit<Scale, 'hour'> | 'year';

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

export type ApiActivityListProps = {
  data: {
    apiName: string;
    apiDef: string;
    success: number;
    failed: number;
    count: number;
    lastAccess: number;
  }[];
  onApiClick: (apiDef: string) => void;
};
