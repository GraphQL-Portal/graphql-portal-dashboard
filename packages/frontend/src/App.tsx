import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { AuthProvider, ThemeProvider, Router, ROUTES, StateProvider, ToastProvider } from './model/providers';
import { ProtectedRoutes, Login } from './view';

function App() {
  return (
    <AuthProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StateProvider>
          <Router>
            <ThemeProvider>
              <ToastProvider>
                <Switch>
                  <Route path={ROUTES.LOGIN}>
                    <Login />
                  </Route>
                  <Route path={ROUTES.MAIN}>
                    <ProtectedRoutes />
                  </Route>
                </Switch>
              </ToastProvider>
            </ThemeProvider>
          </Router>
        </StateProvider>
      </MuiPickersUtilsProvider>
    </AuthProvider>
  );
}

export default App;
