import { gql } from '@apollo/client';

export const GATEWAYS_UPDATE = gql`
  subscription GatewaysUpdated {
    gatewaysUpdated {
      nodeId
      lastPingAt
      configTimestamp
    }
  }
`;
