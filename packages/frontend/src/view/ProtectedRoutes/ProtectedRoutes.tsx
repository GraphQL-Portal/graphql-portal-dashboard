import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES, useAuth } from '../../model/providers';
import {
  Content,
  DataSources,
  Dashboard,
  Documentation,
  GatewayNodes,
  GlobalSettings,
  MetricsAndLogs,
  MyAPI,
  Services,
  Sidebar,
  SupportForum,
  Users,
  Webhooks,
  ApiMetrics,
} from '..';

export const ProtectedRoutes: React.FC = () => {
  const { accessToken } = useAuth();

  if (!accessToken) return <Redirect to={ROUTES.LOGIN} />

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
          <Route path={ROUTES.API_METRICS}>
            <ApiMetrics />
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
            <Users />
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
}
