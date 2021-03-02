import { formatDistanceToNow } from 'date-fns';
import { DataSource } from '../../../types';
import { compose, getObjProp } from '../../../utils';
import { getHandlerKey } from './getHandlerKey';
import { getHandlerName } from './transformHandlerName';

export const formatDateDistance = (date: string | undefined): string => {
  return date === undefined
    ? ''
    : formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const createDataSourceList = (list: DataSource[]): DataSource[] => {
  if (list.length === 0) return [];

  return list
    .map(({ handler, updatedAt, ...source }: DataSource) => {
      const handlerBody = compose(getObjProp(handler), getHandlerKey)(handler);
      const handlerKey = compose(getHandlerName, getHandlerKey)(handler);
      return Object.assign({}, source, {
        handler: { [handlerKey]: handlerBody },
        updatedAt: formatDateDistance(updatedAt),
      });
    })
    .sort((one, two) => (one.name > two.name ? 1 : -1));
};
