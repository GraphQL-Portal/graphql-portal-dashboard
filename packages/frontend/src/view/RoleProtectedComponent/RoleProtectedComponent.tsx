import { Redirect } from 'react-router';
import { useAuth } from '../../model/providers';
import { Roles } from '../../model/providers/Auth/constants';

export const RoleProtectedComponent: React.FC<{
  roles: Roles[];
  Component: React.FC<any>;
  redirectTo?: string;
}> = ({ roles, Component, redirectTo, ...componentProps }) => {
  const { role } = useAuth();
  return roles.includes(role) ? (
    <Component {...componentProps} />
  ) : !!redirectTo ? (
    <Redirect to={redirectTo} />
  ) : null;
};
