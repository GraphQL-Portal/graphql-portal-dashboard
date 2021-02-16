import { useParams } from 'react-router-dom';
import { useApiDefById } from '../../model/ApiDefs/queries';
import { useTabs } from '../../model/Hooks';

export const useApiById = () => {
  const { id } = useParams<{ id: string }>();
  const { tab, onChange } = useTabs();
  const { loading, data: api, refetch } = useApiDefById({ variables: { id } });

  return { loading, api, tab, onTabChange: onChange, refetch };
};
