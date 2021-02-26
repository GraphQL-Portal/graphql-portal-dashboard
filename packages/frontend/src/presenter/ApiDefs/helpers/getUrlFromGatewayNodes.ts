import { Gateway } from '../../../types';

export const getUrlFromGatewayNodes = (
  nodes: Gateway[] = [],
  endpoint: string = ''
) => {
  const { listenPort, listenHostname, servername } = nodes[0] || {};
  const uri =
    servername || (listenPort && listenHostname)
      ? `${listenHostname}:${listenPort}`
      : '';
  return `${window.location.protocol}//${uri}${endpoint}`;
};
