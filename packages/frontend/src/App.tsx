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
import {
  ProtectedRoutes,
  Login,
  SignUp,
  ResetPassword,
  ResetPasswordRequest,
  ConfirmEmail,
} from './view';

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <Router>
          <ThemeProvider>
            <ToastProvider>
              <Switch>
                <Route path={ROUTES.CONFIRM_EMAIL}>
                  <ConfirmEmail />
                </Route>
                <Route path={ROUTES.RESET_PASSWORD_REQUEST}>
                  <ResetPasswordRequest />
                </Route>
                <Route path={ROUTES.RESET_PASSWORD}>
                  <ResetPassword />
                </Route>
                <Route path={ROUTES.LOGIN}>
                  <Login />
                </Route>
                <Route path={ROUTES.SIGN_UP}>
                  <SignUp />
                </Route>
                <Route path={ROUTES.MAIN}>
                  <ProtectedRoutes />
                </Route>
              </Switch>
            </ToastProvider>
          </ThemeProvider>
        </Router>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;
