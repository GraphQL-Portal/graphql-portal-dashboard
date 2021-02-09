import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES, useAuth } from '../../model/providers';
import { Content } from '../Content';
import { DataSources } from '../DataSources';
import { Dashboard } from '../Dashboard';
import { Documentation } from '../Documentation';
import { GatewayNodes } from '../GatewayNodes';
import { GlobalSettings } from '../GlobalSettings';
import { MetricsAndLogs } from '../MetricsAndLogs';
import { MyAPI } from '../MyAPI';
import { Services } from '../Services';
import { Sidebar } from '../Sidebar';
import { SupportForum } from '../SupportForum';
import { Users } from '../Users';
import { Webhooks } from '../Webhooks';
import { RoleProtectedComponent } from '..';
import { Roles } from '../../model/providers/Auth/constants';

export const ProtectedRoutes: React.FC = () => {
  const { accessToken } = useAuth();
  const ProtectedUsers = RoleProtectedComponent(
    [Roles.ADMIN],
    Users,
    ROUTES.MAIN
  );

  if (!accessToken) return <Redirect to={ROUTES.LOGIN} />;

  return (
    <>
      <Sidebar />
      <Content>
        <Switch>
          <Route path="/" exact>
            <Redirect to={ROUTES.NODES} />
          </Route>
          <Route path={ROUTES.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route path={ROUTES.APIS}>
            <MyAPI />
          </Route>
          <Route path={ROUTES.DATA_SOURCES}>
            <DataSources />
          </Route>
          <Route path={ROUTES.METRICS_AND_LOGS}>
            <MetricsAndLogs />
          </Route>
          <Route path={ROUTES.USERS}>
            <ProtectedUsers />
          </Route>
          <Route path={ROUTES.GLOBAL}>
            <GlobalSettings />
          </Route>
          <Route path={ROUTES.WEBHOOKS}>
            <Webhooks />
          </Route>
          <Route path={ROUTES.NODES}>
            <GatewayNodes />
          </Route>
          <Route path={ROUTES.DOCUMENTATION}>
            <Documentation />
          </Route>
          <Route path={ROUTES.SUPPORT}>
            <SupportForum />
          </Route>
          <Route path={ROUTES.SERVICES}>
            <Services />
          </Route>
        </Switch>
      </Content>
    </>
  );
};
