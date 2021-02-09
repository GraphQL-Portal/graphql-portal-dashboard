import { Redirect } from 'react-router';
import { useAuth } from '../../model/providers';
import { Roles } from '../../model/providers/Auth/constants';

export const RoleProtectedComponent = <T,>(
  roles: Roles[],
  Component: React.FC<T>,
  redirectTo?: string
): React.FC<T> => {
  const Wrapped: React.FC<T> = (props) => {
    const { role } = useAuth();
    if (roles.includes(role)) return <Component {...props} />;
    if (redirectTo) return <Redirect to={redirectTo} />;
    return <></>;
  };

  return Wrapped;
};
