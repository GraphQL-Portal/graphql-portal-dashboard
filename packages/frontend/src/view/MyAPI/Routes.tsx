import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from '../../model/providers';
import { MyAPI } from './List/MyAPI';
import { CreateApi } from './Create';
import { EditApi } from './Edit';

export const Routes:React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.API_CREATE} exact>
        <CreateApi />
      </Route>
      <Route path={ROUTES.API_EDIT}>
        <EditApi />
      </Route>
      <Route path={ROUTES.APIS} exact>
        <MyAPI />
      </Route>
    </Switch>
  );
}
