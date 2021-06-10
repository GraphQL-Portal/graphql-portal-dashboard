import { useMutation, gql } from '@apollo/client';

import { MutationOptions } from '../../../types';

const CREATE_SOURCE = gql`
  mutation CreateSource($source: CreateSource!) {
    createSource(source: $source) {
      name
    }
  }
`;

export const useCreateSource = (options: MutationOptions = {}) => {
  const [createSource, { loading }] = useMutation(CREATE_SOURCE, options);

  return { createSource, loading };
};
