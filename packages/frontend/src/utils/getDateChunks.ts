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

const TRANSFORMER = {
  hour: addMinutes,
  day: addHours,
  week: addHours,
  month: addDays,
};

const INTERVAL = {
  hour: 5,
  day: 1,
  week: 6,
  month: 1,
};

const DATES = {
  hour() {
    const endDate = startOfMinute(new Date());
    return {
      endDate,
      startDate: subHours(endDate, 1),
    };
  },
  day() {
    const endDate = startOfHour(new Date());
    return {
      endDate,
      startDate: subDays(endDate, 1),
    };
  },
  week() {
    const endDate = startOfHour(new Date());
    return {
      endDate,
      startDate: subDays(endDate, 7),
    };
  },
  month() {
    const endDate = endOfDay(new Date());
    return {
      endDate,
      startDate: subDays(endDate, 30),
    };
  },
};

export function getDateRange(range: Range) {
  return DATES[range]();
}

function genRange({
  transformer,
  interval,
  startDate,
  endDate,
}: {
  transformer: Function;
  interval: number;
  startDate: Date;
  endDate: Date;
}): Date[] {
  const result: Date[] = [startDate];
  while (differenceInSeconds(startDate, endDate) < 0) {
    startDate = transformer(startDate, interval);
    result.push(startDate);
  }

  return result;
}

export function getDateChunks(range: Range): Date[] {
  return genRange({
    transformer: TRANSFORMER[range],
    interval: INTERVAL[range],
    ...getDateRange(range),
  });
}
