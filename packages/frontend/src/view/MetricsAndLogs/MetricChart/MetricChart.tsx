import React, { ReactText } from 'react';
import { ArgumentAxis, Chart, LineSeries, Title, ValueAxis } from '@devexpress/dx-react-chart-material-ui';

const checkHandler = (fn: Function) => (fn ? fn : (text: ReactText) => text);

type MetricChartProps = { data: any[]; title?: string; argumentLabelHandler?: any; valueLabelHandler?: any };
export const MetricChart:React.FC<MetricChartProps> = ({ data, title, argumentLabelHandler, valueLabelHandler }) => {
  const ArgumentLabel = (e: React.PropsWithChildren<ArgumentAxis.LabelProps>) => (
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
