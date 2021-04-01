import { format } from 'date-fns';
import { CHART_SUFFIX } from './constants';
import { Range } from '../../types';

export const formatDateForRange = (range: Range = 'hour') => (ts: Date) => {
  const dateFormat = range === 'hour' || range === 'day' ? 'HH:mm' : 'MM/dd';
  return format(new Date(ts), dateFormat);
};

export const tickFormatter = (range: Range = 'hour') => (ts: any) =>
  ts === 'auto' || ts === 0 ? ts : formatDateForRange(range)(ts);

export const formatter = (value: number, name: string): string =>
  `${Math.round(value)}${CHART_SUFFIX[name] || ''}`;
