import React from 'react';
import { EventTracker } from '@devexpress/dx-react-chart';
import {
  Tooltip,
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

type CountryChartProps = {
  data: any[];
  title?: string;
  argumentLabelHandler?: any;
  valueLabelHandler?: any;
};
export const CountryChart: React.FC<CountryChartProps> = ({ data, title }) => {
  return (
    <Chart data={data}>
      <Title text={title} />
      <EventTracker />
      <Tooltip
        contentComponent={(e) => (
          <Tooltip.Content
            text={`${e.text} request(s)`}
            targetItem={e.targetItem}
          />
        )}
      />
      <PieSeries valueField="value" argumentField="argument" />
      <Legend />
    </Chart>
  );
};
