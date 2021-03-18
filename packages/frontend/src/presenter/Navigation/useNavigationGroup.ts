import { useAuth } from '../../model/providers';
import { GroupItem, UseNavigationGroupHook } from '../../types';
import { isZeroLength } from '../../utils';

export const useNavigationGroup: UseNavigationGroupHook = items => {
  const { role } = useAuth();
  const filteredItems = items.filter(({ roles }: GroupItem) =>
    roles.includes(role)
  );

  return {
    navItems: filteredItems,
    withoutItems: isZeroLength(filteredItems),
  };
};
