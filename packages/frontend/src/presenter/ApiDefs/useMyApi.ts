import { generatePath, useHistory } from 'react-router-dom';
import { useApiDefs } from '../../model/ApiDefs/queries';
import { useDeleteApiDef } from '../../model/ApiDefs/commands';
import { ApiDef } from './types';
import { createApiDefList } from './helpers';
import { ROUTES } from '../../model/providers';

export const useMyApi = () => {
  const { push } = useHistory();
  const { data, loading } = useApiDefs();
  const [deleteApiDef] = useDeleteApiDef();

  const getApiDef = (index: number): ApiDef => data[index];

  const onDelete = (index: number) =>
    deleteApiDef({ variables: { id: getApiDef(index)._id } });
  const onUpdate = (index: number) =>
    push(generatePath(ROUTES.API_EDIT, { id: getApiDef(index)._id }));
  const onCreate = () => push(ROUTES.API_CREATE);

  return {
    data: createApiDefList(data),
    loading,
    onDelete,
    onUpdate,
    onCreate,
  };
};
