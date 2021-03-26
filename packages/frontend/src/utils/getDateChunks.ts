import {
  addDays,
  addHours,
  addMinutes,
  differenceInSeconds,
  endOfDay,
  startOfHour,
  startOfMinute,
  subDays,
  subHours,
} from 'date-fns';
import { Range } from '../types';

export function getDateChunks(range: Range): Date[] {
  let boundaries: Date[] = [];

  if (range) {
    switch (range) {
      case 'hour': {
        const end = startOfMinute(new Date());
        const start = subHours(end, 1);
        boundaries = genRange(addMinutes, 5, start, end);
        break;
      }
      case 'day': {
        const end = startOfHour(new Date());
        const start = subDays(end, 1);
        boundaries = genRange(addHours, 1, start, end);
        break;
      }
      case 'week': {
        const end = startOfHour(new Date());
        const start = subDays(end, 7);
        boundaries = genRange(addHours, 6, start, end);
        break;
      }
      case 'month': {
        const end = endOfDay(new Date());
        const start = subDays(end, 30);
        boundaries = genRange(addDays, 1, start, end);
        break;
      }
    }
  }

  return boundaries;
}

function genRange(
  addFN: Function,
  interval: number,
  start: Date,
  end: Date
): Date[] {
  const result: Date[] = [start];
  while (differenceInSeconds(start, end) < 0) {
    start = addFN(start, interval);
    result.push(start);
  }

  return result;
}
