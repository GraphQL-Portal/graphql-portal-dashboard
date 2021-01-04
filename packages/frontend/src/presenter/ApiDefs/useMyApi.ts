import { useHistory } from 'react-router-dom';
import { useApiDefs, useDeleteApiDef } from '../../model/ApiDefs/queries';
import { ApiDef } from './types';
import { createApiDefList } from './helpers';

export const useMyApi = () => {
  const history = useHistory();
  const { data, loading } = useApiDefs();
  const [deleteApiDef] = useDeleteApiDef();

  const getApiDef = (index: number): ApiDef => data[index];

  const onDelete = (index: number) => deleteApiDef({ variables: { id: getApiDef(index)._id } });
  const onUpdate = (index: number) => history.push(`/my-apis/${getApiDef(index)._id}`);
  const onCreate = () => history.push('/my-apis/new');

  return {
    data: createApiDefList(data),
    loading,
    onDelete,
    onUpdate,
    onCreate,
  };
}
