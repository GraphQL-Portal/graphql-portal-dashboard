import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import { useMetrics } from '../../presenter/Metrics';
import { Header, HugeWidget, Widget, WidgetRow, Select } from '../../ui';

import { useStyles } from './useStyles';
import { ToggleButtonGroup } from '@material-ui/lab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Range, RangeList } from '../../types';
import { format } from 'date-fns';
import {
  NameType,
  ValueType,
} from 'recharts/src/component/DefaultTooltipContent';
import { ContentType, TooltipProps } from 'recharts/src/component/Tooltip';

function formatDateForRange(ts: Date, range: Range = 'hour') {
  if (range === 'hour' || range === 'day') return format(new Date(ts), 'HH:mm');
  else return format(new Date(ts), 'MM/dd');
}

export const Dashboard: React.FC = () => {
  const { widget, apiSelect } = useStyles();
  const {
    data = {},
    range,
    setRange,
    selectApiDef,
    apiDef,
    apis,
  } = useMetrics();
  const { avgLatency = [], count = [], countries = [], failures = [] } = data;

  const handleDateRange = (
    event: React.MouseEvent<HTMLElement>,
    newDateRange: Range | null
  ) => {
    newDateRange ? setRange(newDateRange) : setRange('hour');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <WidgetRow>
        <Widget className={widget}>
          <ToggleButtonGroup
            value={range}
            onChange={handleDateRange}
            exclusive
            size="large"
          >
            {RangeList.map((value) => (
              <ToggleButton value={value} key={value}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Widget>
        <Widget className={widget}>
          <Select
            className={apiSelect}
            options={apis}
            value={apiDef}
            label="API"
            onChange={(e, { props }: any) => selectApiDef(props?.value)}
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <ResponsiveContainer width={1400} height={400}>
            <AreaChart
              data={avgLatency}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="chunk"
                type="category"
                minTickGap={7}
                tickFormatter={(ts) => {
                  return ts === 'auto' || ts === 0
                    ? ts
                    : formatDateForRange(ts, range);
                }}
              />
              <YAxis name="Date" unit="ms" />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Tooltip
                labelFormatter={(v) => formatDateForRange(v, range)}
                formatter={(value: any, name: any, props: any) =>
                  `${Math.round(value)}ms`
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </HugeWidget>
      </WidgetRow>
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <RequestChart*/}
      {/*      data={latency}*/}
      {/*      title="Average Request Latency"*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      valueLabelHandler={formatValueLabel}*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <RequestChart*/}
      {/*      data={count}*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      title="Average Request Count"*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
      {/*{countries.length > 0 && (*/}
      {/*  <WidgetRow>*/}
      {/*    <HugeWidget>*/}
      {/*      <CountryChart*/}
      {/*        data={countries}*/}
      {/*        title="Countries where requests were made from"*/}
      {/*      />*/}
      {/*    </HugeWidget>*/}
      {/*  </WidgetRow>*/}
      {/*)}*/}
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <FailureRequestRateChart*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      data={failures}*/}
      {/*      title="Failure/Success Chart"*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
    </>
  );
};
