import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from '../../model/providers';
import { DataSources } from './DataSources/DataSources';

export const Routes:React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.DATA_SOURCES} exact>
        <DataSources />
      </Route>
    </Switch>
  );
}
