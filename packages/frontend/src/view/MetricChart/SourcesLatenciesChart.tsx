import React from 'react';
import {
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useTheme } from '@material-ui/core';

import { formatDateForRange, formatter, randomColor } from './helpers';

export const SourcesLatenciesChart: React.FC<any> = ({ data, range }: any) => {
  const formattedWithRange = formatDateForRange(range);
  const { palette } = useTheme();

  const tickStyles = { fill: palette.text.secondary, fontSize: 12 };

  const lines = Object.keys(data[0] || {}).filter(
    (key) => !['avgLatency', 'chunk'].includes(key)
  );
  const sourceLines = lines.map((line) => (
    <Line
      yAxisId="latency"
      type="monotone"
      dataKey={line}
      stroke={randomColor()}
    />
  ));

  return (
    <ResponsiveContainer height={400}>
      <ComposedChart data={data}>
        <XAxis
          dataKey="chunk"
          type="category"
          minTickGap={7}
          tickFormatter={formattedWithRange}
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
          name="LatencyRight"
          unit="ms"
          yAxisId="latencyRight"
          orientation="right"
          tick={tickStyles}
        />
        <Line
          yAxisId="latency"
          type="monotone"
          dataKey="avgLatency"
          stroke={palette.secondary.main}
        />
        {sourceLines}
        <Tooltip
          labelStyle={{
            color: palette.background.default,
            fontSize: 14,
          }}
          labelFormatter={formattedWithRange}
          formatter={formatter}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={palette.action.disabled} />
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
