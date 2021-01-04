import { useMutation } from '@apollo/client';
import { DELETE_API_DEF, QUERY_API_DEFS } from '../../../commands';

export const useDeleteApiDef = () => {
  return useMutation(DELETE_API_DEF, { refetchQueries: [{ query: QUERY_API_DEFS }] });
}