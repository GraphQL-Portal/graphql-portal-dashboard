import React from 'react';
import { useHistory } from 'react-router-dom';
import { getQueryData } from '../../utils/getQueryString';
import { Redirect, Link } from 'react-router-dom';
import { ROUTES, useAuth } from '../../model/providers';
import { LogoFull } from '../../icons';
import { H3 } from '../../ui';
import { Content } from '../Content';
import { useStyles } from './useStyles';

export const ConfirmEmail: React.FC = () => {
  const { content, logo } = useStyles();
  const { location } = useHistory();
  const { result, error } = getQueryData(location.search);
  const { accessToken } = useAuth();

  if (accessToken) return <Redirect to={ROUTES.MAIN} />;

  const message =
    result === 'success'
      ? 'Your email was successfully confirmed! 🎉 '
      : ` 😢 ${
          error || 'Oops... Something went wrong. Try again later, please'
        }`;

  return (
    <Content className={content}>
      <div className={logo}>
        <LogoFull />
      </div>
      <div>
        <H3>{message}</H3>
        <br />
        <Link to={ROUTES.LOGIN}> Log In </Link>
      </div>
    </Content>
  );
};
