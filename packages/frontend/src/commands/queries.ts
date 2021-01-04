import { gql } from '@apollo/client';

export const QUERY_API_DEFS = gql`
  {
    getApiDefs {
      apiDefs {
        _id
        name
        createdAt
        updatedAt
      }
      timestamp
    }
  }
`;

export const DATA_SOURCES = gql`{
  getSources {
    name
    handler
    transforms
  }
}`;

export const QUERY_GATEWAYS = gql`
  {
    getGateways {
      nodeId
      lastPingAt
      configTimestamp
    }
  }
`;

export const QUERY_USERS = gql`
  {
    getUsers {
      firstName
      lastName
      role
      email
      createdAt
      updatedAt
    }
  }
`;

export const SYNC_CONFIGURATION = gql`
  {
    publishApiDefsUpdated
    getApiDefs {
      timestamp
    }
  }
`;
