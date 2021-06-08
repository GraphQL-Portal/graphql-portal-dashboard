import { format } from 'date-fns';
import { CHART_SUFFIX } from './constants';
import { Range } from '../../types';

export const formatDateForRange =
  (range: Range = 'hour') =>
  (ts: any) => {
    const dateFormat = range === 'hour' || range === 'day' ? 'HH:mm' : 'MM/dd';

    try {
      return format(new Date(ts), dateFormat);
    } catch (_) {
      return ts;
    }
  };

export const formatter = (value: number, name: string): string =>
  `${Math.round(value)}${CHART_SUFFIX[name] || ''}`;

export const readableColors = [
  'rgb(205, 125, 222)',
  'rgb(84, 194, 202)',
  'rgb(79, 232, 45)',
  'rgb(7, 101, 18)',
  'rgb(185, 138, 114)',
  'rgb(93, 156, 80)',
  'rgb(90, 68, 94)',
  'rgb(121, 161, 46)',
  'rgb(241, 228, 60)',
  'rgb(122, 182, 82)',
  'rgb(199, 176, 62)',
];
