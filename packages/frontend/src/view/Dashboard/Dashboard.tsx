import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from 'recharts';

import { useMetrics } from '../../presenter/Metrics';
import { Header, HugeWidget, Widget, WidgetRow, Select } from '../../ui';

import { useStyles } from './useStyles';
import { ToggleButtonGroup } from '@material-ui/lab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Range, RangeList } from '../../types';
import { format } from 'date-fns';

function formatDateForRange(ts: Date, range: Range = 'hour') {
  console.log(ts);
  if (range === 'hour' || range === 'day') return format(new Date(ts), 'HH:mm');
  else return format(new Date(ts), 'MM/dd');
}

function tickFormatter(range: Range = 'hour') {
  return (ts: any) =>
    ts === 'auto' || ts === 0 ? ts : formatDateForRange(ts, range);
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
            label="Filter by API"
            onChange={(e, { props }: any) => selectApiDef(props?.value)}
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <ResponsiveContainer width={1400} height={400}>
            <ComposedChart
              data={data}
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
              <YAxis
                name="Latency"
                unit="ms"
                yAxisId="latency"
                orientation="left"
              />
              <YAxis
                name="Count"
                unit="reqs"
                yAxisId="count"
                orientation="right"
              />
              <Area
                yAxisId="latency"
                type="monotone"
                dataKey="avgLatency"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Line
                yAxisId="count"
                type="monotone"
                dataKey="count"
                stroke="#2884d8"
              />
              <Tooltip
                labelFormatter={(v) => formatDateForRange(v, range)}
                formatter={(value: any, name: string, props: any) => {
                  const suffix: { [key: string]: string } = {
                    count: 'reqs',
                    avgLatency: 'ms',
                  };
                  return suffix[name]
                    ? `${Math.round(value)}${suffix[name]}`
                    : `${Math.round(value)}`;
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <ResponsiveContainer width={1400} height={400}>
            <ComposedChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <YAxis name="successes" yAxisId="successes" orientation="left" />
              <YAxis name="failures" yAxisId="failures" orientation="right" />

              <XAxis
                dataKey="chunk"
                type="category"
                minTickGap={7}
                tickFormatter={tickFormatter(range)}
              />

              <Area
                yAxisId="successes"
                type="monotone"
                dataKey="successes"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                yAxisId="failures"
                type="monotone"
                dataKey="failures"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Tooltip />
            </ComposedChart>
          </ResponsiveContainer>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
