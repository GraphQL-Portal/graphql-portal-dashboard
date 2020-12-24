import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ThemeProvider, Router, ROUTES, StateProvider, AuthProvider } from './model/providers';
import { ProtectedRoutes, Login } from './view';

function App() {
  return (
    <StateProvider>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <Switch>
              <Route path={ROUTES.LOGIN}>
                <Login />
              </Route>
              <Route path={ROUTES.MAIN}>
                <ProtectedRoutes />
              </Route>
            </Switch>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </StateProvider>
  );
}

export default App;
