import { formatTimestamp } from '../../../utils';
import { ApiDef, ApiListItem } from '../../../types';

export const createApiDefList = (data: ApiDef[]): ApiListItem[] => {
  if (!data) return [];

  return data.map((api: ApiDef) =>
    Object.assign({}, api, {
      status: 'active',
      createdAt: formatTimestamp(api.createdAt),
    })
  );
};
