import { useAuth } from '../../model/providers';
import { useProfile as queryProfile } from '../../model/Users/queries';
import { UseProfileHook } from '../../types';
import { useTabs } from '../../model/Hooks';

export const useProfile: UseProfileHook = () => {
  const { tab, onChange } = useTabs();
  const { signOut } = useAuth();

  const { data, loading, refetch } = queryProfile();

  return {
    signOut,
    data,
    loading,
    tab,
    onChange,
    refetch,
  };
};
