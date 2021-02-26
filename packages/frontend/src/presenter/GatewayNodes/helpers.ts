import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Gateway } from '../../types';

export const createNodeList = (data: Gateway[]): Gateway[] => {
  if (!data) return [];

  return data
    .slice()
    .sort((a, b) => b.lastPingAt - a.lastPingAt)
    .map((gateway: Gateway) =>
      Object.assign({}, gateway, {
        lastPingAt: formatDistanceToNow(gateway.lastPingAt, {
          addSuffix: true,
        }),
      })
    );
};
