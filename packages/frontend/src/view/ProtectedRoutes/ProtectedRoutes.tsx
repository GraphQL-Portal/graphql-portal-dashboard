import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES, useAuth } from '../../model/providers';
import { ROLE_ADMIN } from '../../model/providers/Auth/constants';
import { Content } from '../Content';
import { DataSources } from '../DataSources';
import { Dashboard } from '../Dashboard';
import { GatewayNodes } from '../GatewayNodes';
// import { GlobalSettings } from '../GlobalSettings';
import { MyAPI } from '../MyAPI';
import { Sidebar } from '../Sidebar';
import { Users } from '../Users';
// import { Webhooks } from '../Webhooks';
import { ApiMetrics } from '../ApiMetrics';
import { RoleProtectedComponent } from '../RoleProtectedComponent';
import { ApisActivity } from '../ApisActivity';

export const ProtectedRoutes: React.FC = () => {
  const { accessToken } = useAuth();

  if (!accessToken) return <Redirect to={ROUTES.LOGIN} />;

  return (
    <>
      <Sidebar />
      <Content>
        <Switch>
          <Route path="/" exact>
            <Redirect to={ROUTES.DASHBOARD} />
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
          <Route path={ROUTES.APIS_ACTIVITY}>
            <ApisActivity />
          </Route>
          <Route path={ROUTES.USERS}>
            <RoleProtectedComponent
              Component={Users}
              roles={[ROLE_ADMIN]}
              redirectTo={ROUTES.MAIN}
            />
          </Route>
          <Route path={ROUTES.NODES}>
            <GatewayNodes />
          </Route>
        </Switch>
      </Content>
    </>
  );
};
