import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  AuthProvider,
  DialogsProvider,
  Router,
  ROUTES,
  StateProvider,
  ThemeProvider,
  ToastProvider,
} from './model/providers';
import { ProtectedRoutes, Login } from './view';

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <Router>
          <ThemeProvider>
            <DialogsProvider>
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
            </DialogsProvider>
          </ThemeProvider>
        </Router>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;
