import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  AuthProvider,
  ThemeProvider,
  Router,
  ROUTES,
  StateProvider,
  ToastProvider,
} from './model/providers';
import { ProtectedRoutes, Login } from './view';

function App() {
  return (
    <StateProvider>
      <Router>
        <AuthProvider>
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
        </AuthProvider>
      </Router>
    </StateProvider>
  );
}

export default App;
