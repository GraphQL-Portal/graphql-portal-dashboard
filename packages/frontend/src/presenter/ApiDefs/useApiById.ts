import { useParams } from 'react-router-dom';
import { useApiDefById } from '../../model/ApiDefs/queries';
import { useTabs } from '../../model/Hooks';
import { UseApiByIdHook } from '../../types';

export const useApiById: UseApiByIdHook = () => {
  const { id } = useParams<{ id: string }>();
  const { tab, onChange } = useTabs();
  const { loading, data, refetch } = useApiDefById({ variables: { id } });

  return { loading, data, tab, onChange, refetch };
};
