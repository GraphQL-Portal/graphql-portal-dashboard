import React from 'react';
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  Title,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { RequestChartProps } from '../../types';
import { checkHandler } from '../../utils';

export const RequestChart: React.FC<RequestChartProps> = ({
  data,
  title,
  argumentLabelHandler,
  valueLabelHandler,
}) => {
  const ArgumentLabel = (
    e: React.PropsWithChildren<ArgumentAxis.LabelProps>
  ) => (
    <ArgumentAxis.Label
      text={checkHandler(argumentLabelHandler)(e.text)}
      x={e.x}
      y={e.y}
      dy={e.dy}
      textAnchor={e.textAnchor}
    />
  );
  const ValueLabel = (e: React.PropsWithChildren<ValueAxis.LabelProps>) => (
    <ArgumentAxis.Label
      text={checkHandler(valueLabelHandler)(e.text)}
      x={e.x}
      y={e.y}
      dy={e.dy}
      textAnchor={e.textAnchor}
    />
  );

  return (
    <Chart data={data}>
      <Title text={title} />
      <ArgumentAxis labelComponent={ArgumentLabel} />
      <ValueAxis labelComponent={ValueLabel} />

      <LineSeries valueField="value" argumentField="argument" />
    </Chart>
  );
};
