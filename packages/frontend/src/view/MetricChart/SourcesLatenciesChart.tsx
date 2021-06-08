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

import { formatDateForRange, formatter, readableColors } from './helpers';

export const SourcesLatenciesChart: React.FC<any> = ({ data, range }: any) => {
  const formattedWithRange = formatDateForRange(range);
  const { palette } = useTheme();

  const tickStyles = { fill: palette.text.secondary, fontSize: 12 };

  const lines = Object.keys(data[0] || {}).filter(
    (key) => !['chunk'].includes(key)
  );

  const emptyLine = (
    <Line
      yAxisId="latency"
      type="monotone"
      dataKey={'No source metrics found'}
      stroke={palette.primary.light}
    />
  );

  const sourceLines = lines.map((line, i) => (
    <Line
      yAxisId="latency"
      type="monotone"
      dataKey={line}
      stroke={readableColors[i % readableColors.length]}
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
        {lines.length ? sourceLines : emptyLine}
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
