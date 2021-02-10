import { formatDistanceToNow } from 'date-fns';
import { AVAILABLE_DATA_SOURCES } from '../../presenter/DataSources/constants';

export const getError = (errors: any) => (field: string) => !!errors?.[field];

export const formatDateDistance = (date: string | undefined): string => {
  return date === undefined
    ? ''
    : formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatHandlerTitle = (title: string): string =>
  title.replace('Handler', '');

export const formatHandlerType = (handler: any): string => {
  return (
    formatHandlerTitle(
      AVAILABLE_DATA_SOURCES[Object.keys(handler)[0]]?.title
    ) ?? ''
  );
};
