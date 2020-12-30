import { gql } from '@apollo/client';

export const DELETE_API_DEF = gql`
  mutation deleteApiDef($id: ID!) {
    deleteApiDef(id: $id)
  }
`;