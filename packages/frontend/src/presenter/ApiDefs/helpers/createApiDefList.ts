import { formatTimestamp } from '../../../utils';
import { ApiDef } from '../../../types';

export const createApiDefList = (data: ApiDef[]): ApiDef[] => {
  if (!data) return [];

  return data.map((api: ApiDef) =>
    Object.assign({}, api, {
      createdAt: formatTimestamp(api.createdAt),
    })
  );
};
