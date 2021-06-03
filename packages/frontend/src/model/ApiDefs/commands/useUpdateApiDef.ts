import { useMutation, gql } from '@apollo/client';

import { QUERY_API_DEFS } from '../queries';
import { MutationHook, MutationOptions } from '../../../types';

const UPDATE_API_DEF = gql`
  mutation updateApiDef(
    $id: ID!
    $apiDef: CreateApiDef!
    $sources: [ID!]!
    $enabled: Boolean
  ) {
    updateApiDef(
      id: $id
      apiDef: $apiDef
      sources: $sources
      enabled: $enabled
    ) {
      apiDef {
        _id
      }
    }
  }
`;

export const useUpdateApiDef = (
  options: MutationOptions = {}
): ReturnType<MutationHook<'updateApiDef'>> & { loading: boolean } => {
  const [updateApiDef, { loading }] = useMutation(UPDATE_API_DEF, {
    refetchQueries: [{ query: QUERY_API_DEFS }],
    ...options,
  });

  return { updateApiDef, loading };
};
