import { useMutation, gql } from '@apollo/client';

const CREATE_SOURCE = gql`
  mutation CreateSource($source: CreateSource!) {
    createSource(source: $source) {
      name
    }
  }
`;

export const useCreateSource = (options?: any) => {
  const [createSource] = useMutation(CREATE_SOURCE, options || {});

  return { createSource };
};
