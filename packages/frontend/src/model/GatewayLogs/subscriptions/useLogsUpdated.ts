import { gql } from '@apollo/client';

export const LOGS_UPDATE = gql`
  subscription LogsUpdated {
    logsUpdated {
      nodeId
      hostname
      prefix
      message
      level
      timestamp
    }
  }
`;
