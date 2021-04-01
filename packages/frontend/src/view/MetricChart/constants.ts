import { ChartButton } from '../../types';

export const CHART_BUTTONS: ChartButton[] = [
  {
    text: 'Hour',
    value: 'hour',
  },
  {
    text: 'Day',
    value: 'day',
  },
  {
    text: 'Week',
    value: 'week',
  },
  {
    text: 'Month',
    value: 'month',
  },
];

export const CHART_SUFFIX: Record<string, string> = {
  count: 'reqs',
  avgLatency: 'ms',
  successes: 'reqs',
  failures: 'reqs',
};
