import { Gateway } from '../../../types';

const { REACT_APP_DASHBOARD_GW_HOSTNAME } = process.env;

/**
 * Gets the endpoint URL on the gateway. URL will be formed from the values in the following order:
 * - REACT_APP_DASHBOARD_GW_HOSTNAME env variable
 * - 'servername' config value of the first gateway node
 * - '{listenHostname}:{listenPort}' config values of the first gateway node
 *
 * @param nodes Gateway nodes
 * @param endpoint
 *
 * @return http(s)://{gateway-hostname}/${endpoint}
 */
export const getUrlFromGatewayNodes = (
  nodes: Gateway[] = [],
  endpoint: string = ''
): string => {
  const { listenPort, listenHostname, servername } =
    nodes[nodes.length - 1] || {};

  let uri = REACT_APP_DASHBOARD_GW_HOSTNAME || servername || '';
  if (!uri && listenPort && listenHostname) {
    uri = `${listenHostname}:${listenPort}`;
  }

  return `${window.location.protocol}//${uri}${endpoint}`;
};
