import { Redirect } from 'react-router';
import { useAuth } from '../../model/providers';
import { Role } from '../../types';

export const RoleProtectedComponent: React.FC<{
  roles: Role[];
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
