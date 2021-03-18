import { Gateway } from '../../../types';

export const getUrlFromGatewayNodes = (
  nodes: Gateway[] = [],
  endpoint: string = ''
) => {
  const { listenPort, listenHostname, servername } = nodes[0] || {};

  let uri = '';
  if (servername) {
    uri = servername;
  } else if (listenPort && listenHostname) {
    uri = `${listenHostname}:${listenPort}`;
  }

  return `${window.location.protocol}//${uri}${endpoint}`;
};
