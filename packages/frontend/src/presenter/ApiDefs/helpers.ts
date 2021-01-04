import { formatTimestamp } from '../../utils';
import { ApiDef } from './types';

export const createApiDefList = (data: ApiDef[]): string[][] => {
  if (!data) return [];

  return data.reduce((acc: any[], apiDef: ApiDef) => {
    acc.push([apiDef.name, 'active', formatTimestamp(apiDef.createdAt)]);
    return acc;
  }, []);
};