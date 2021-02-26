import { useMutation, gql } from '@apollo/client';

import { QUERY_API_DEFS } from '../queries';
import { MutationOptions } from '../../../types';

const CREATE_API_DEF = gql`
  mutation createApiDef($apiDef: CreateApiDef!, $sources: [ID!]!) {
    createApiDef(apiDef: $apiDef, sources: $sources) {
      apiDef {
        _id
      }
    }
  }
`;

export const useCreateApiDef = (options: MutationOptions) => {
  const [createApiDef] = useMutation(CREATE_API_DEF, {
    refetchQueries: [{ query: QUERY_API_DEFS }],
    ...options,
  });

  return { createApiDef };
};
