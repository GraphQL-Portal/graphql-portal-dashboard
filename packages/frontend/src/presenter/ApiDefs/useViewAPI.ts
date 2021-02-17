import { useTabs } from '../../model/Hooks';
import { UseViewAPIHook } from '../../types';

export const useViewAPI = () => {
  const { tab, onChange } = useTabs();

  return {
    tab,
    onChange,
  };
};
