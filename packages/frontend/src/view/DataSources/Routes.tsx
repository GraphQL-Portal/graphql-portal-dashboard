import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES, DataSourceProvider } from '../../model/providers';
import { DataSources } from './DataSources';
import { AddDataSource } from './AddDataSource';

export const Routes: React.FC = () => {
  return (
    <DataSourceProvider>
      <Switch>
        <Route path={ROUTES.DATA_SOURCES} exact>
          <DataSources />
        </Route>
        <Route path={ROUTES.DATA_SOURCE_ADD} exact>
          <AddDataSource mode="add" />
        </Route>
        <Route path={ROUTES.DATA_SOURCE_EDIT} exact>
          <AddDataSource mode="update" />
        </Route>
      </Switch>
    </DataSourceProvider>
  );
};
