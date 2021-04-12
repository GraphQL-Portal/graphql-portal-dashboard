import { useMutation, gql } from '@apollo/client';

import { MutationOptions } from '../../../types';

const DELETE_SOURCE = gql`
  mutation deleteSourceByName($name: String!) {
    deleteSourceByName(name: $name)
  }
`;

export const useDeleteSourceByName = (options: MutationOptions = {}) => {
  const [deleteSource] = useMutation(DELETE_SOURCE, options);

  return { deleteSource };
};
