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

const r = () => Math.floor(Math.random() * 256);

export const randomColor = (): string => `rgb(${r()}, ${r()}, ${r()})`;
