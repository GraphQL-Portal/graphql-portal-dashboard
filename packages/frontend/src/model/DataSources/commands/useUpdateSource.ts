import { useMutation, gql } from '@apollo/client';

const UPDATE_SOURCE = gql`
  mutation UpdateSource($id: ID!, $source: CreateSource!) {
    updateSource(id: $id, source: $source) {
      _id
    }
  }
`;

export const useUpdateSource = (options?: any) => {
  const [updateSource] = useMutation(UPDATE_SOURCE, options || {});

  return { updateSource };
};
