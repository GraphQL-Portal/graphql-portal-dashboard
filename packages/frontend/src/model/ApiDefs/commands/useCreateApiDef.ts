import { useMutation, gql } from '@apollo/client';
import { QUERY_API_DEFS } from '../queries';

const CREATE_API_DEF = gql`
  mutation createApiDef($apiDef: CreateApiDef!, $sources: [ID!]!) {
    createApiDef(apiDef: $apiDef, sources: $sources) {
      _id
    }
  }
`;

export const useCreateApiDef = (options: any) => {
  const [createApiDef] = useMutation(CREATE_API_DEF, {
    refetchQueries: [{ query: QUERY_API_DEFS }],
    ...options,
  });

  return { createApiDef };
};
