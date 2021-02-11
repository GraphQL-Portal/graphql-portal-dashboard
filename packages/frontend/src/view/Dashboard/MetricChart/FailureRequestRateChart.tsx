import React, { ReactText } from 'react';
import {
  ArgumentAxis,
  Chart,
  Legend,
  LineSeries,
  Title,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

const checkHandler = (fn?: Function) => (fn ? fn : (text: ReactText) => text);

type FailureRequestRateChartProps = {
  data: {
    success: number;
    failure: number;
    argument: number;
  }[];
  title?: string;
  argumentLabelHandler?: Function;
  valueLabelHandler?: Function;
};

export const FailureRequestRateChart: React.FC<FailureRequestRateChartProps> = ({
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

      <LineSeries
        name="Success"
        valueField="success"
        argumentField="argument"
      />
      <LineSeries
        name="Failure"
        valueField="failure"
        argumentField="argument"
      />
      <Legend />
    </Chart>
  );
};
