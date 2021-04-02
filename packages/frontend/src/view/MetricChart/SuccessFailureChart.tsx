import React from 'react';
import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useTheme } from '@material-ui/core';

import { formatDateForRange, formatter } from './helpers';

export const SuccessFailureChart: React.FC<any> = ({ data, range }: any) => {
  const formattedWithRange = formatDateForRange(range);
  const { palette } = useTheme();

  const tickStyles = { fill: palette.text.secondary, fontSize: 12 };

  return (
    <ResponsiveContainer height={400}>
      <ComposedChart data={data}>
        <YAxis
          name="successes"
          yAxisId="successes"
          orientation="left"
          tick={tickStyles}
        />
        <YAxis
          name="failures"
          yAxisId="failures"
          orientation="right"
          tick={tickStyles}
        />
        <XAxis
          dataKey="chunk"
          type="category"
          minTickGap={7}
          tickFormatter={formattedWithRange}
          tick={tickStyles}
        />

        <Area
          yAxisId="successes"
          type="monotone"
          dataKey="successes"
          stroke={palette.success.light}
          fill={palette.success.main}
        />
        <Area
          yAxisId="failures"
          type="monotone"
          dataKey="failures"
          stroke={palette.error.dark}
          fill={palette.error.light}
        />
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
