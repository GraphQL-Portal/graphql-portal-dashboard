import React from 'react';
import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '@material-ui/core';

import { formatDateForRange, formatter, tickFormatter } from './helpers';

export const LatencyRequestChart: React.FC<any> = ({ data, range }: any) => {
  const tick = tickFormatter(range);
  const labelFormatter = formatDateForRange(range);
  const { palette } = useTheme();

  const tickStyles = { fill: palette.text.secondary, fontSize: 12 };

  return (
    <ResponsiveContainer height={400}>
      <ComposedChart data={data}>
        <XAxis
          dataKey="chunk"
          type="category"
          minTickGap={7}
          tickFormatter={tick}
          tick={tickStyles}
        />
        <YAxis
          name="Latency"
          unit="ms"
          yAxisId="latency"
          orientation="left"
          tick={tickStyles}
        />
        <YAxis
          name="Count"
          unit="reqs"
          yAxisId="count"
          orientation="right"
          tick={tickStyles}
        />
        <Area
          yAxisId="latency"
          type="monotone"
          dataKey="avgLatency"
          stroke={palette.primary.light}
          fill={palette.primary.main}
        />
        <Line
          yAxisId="count"
          type="monotone"
          dataKey="count"
          stroke={palette.secondary.main}
        />
        <Tooltip
          labelStyle={{
            color: palette.background.default,
            fontSize: 14,
          }}
          labelFormatter={labelFormatter}
          formatter={formatter}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={palette.action.disabled} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
