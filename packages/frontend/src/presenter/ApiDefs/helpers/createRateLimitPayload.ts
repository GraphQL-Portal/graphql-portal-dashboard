import { ApiDefRateLimit } from '../../../types';

const isPartExist = (part: number | undefined) => !part || part === 0;

export const createRateLimitPayload = ({
  complexity,
  per,
}: ApiDefRateLimit = {}) => {
  if (isPartExist(complexity) && isPartExist(per)) return {};
  return {
    rate_limit: {
      ...(!isPartExist(complexity) ? { complexity } : {}),
      ...(!isPartExist(per) ? { per } : {}),
    },
  };
};
