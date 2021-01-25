import { useMutation, gql } from '@apollo/client';

const DELETE_SOURCE = gql`
  mutation DeleteSource($id: ID!) {
    deleteSource(id: $id)
  }
`;

export const useDeleteSource = (options?: any) => {
  const [deleteSource] = useMutation(DELETE_SOURCE, options || {});

  return { deleteSource };
};
