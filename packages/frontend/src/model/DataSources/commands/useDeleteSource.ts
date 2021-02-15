import { useMutation, gql } from '@apollo/client';

import { MutationOptions } from '../../../types';

const DELETE_SOURCE = gql`
  mutation DeleteSource($id: ID!) {
    deleteSource(id: $id)
  }
`;

export const useDeleteSource = (options: MutationOptions = {}) => {
  const [deleteSource] = useMutation(DELETE_SOURCE, options);

  return { deleteSource };
};
