import { ApiDef } from '../../view/MyAPI/types';

export const createApiDefList = (data: ApiDef[]): string[][] => {
  if (!data) return [];

  return data.reduce((acc: any[], apiDef: ApiDef) => {
    acc.push([apiDef.name, 'active', new Date(parseInt(apiDef.createdAt)).toLocaleDateString()]);
    return acc;
  }, []);
};