const {
  REACT_APP_DASHBOARD_URL,
  REACT_APP_DASHBOARD_WS_URL,
  AUTO_LOGIN_ENABLED,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
} = process.env;

export const URI = REACT_APP_DASHBOARD_URL || 'http://localhost:3030/graphql';
export const wsURI =
  REACT_APP_DASHBOARD_WS_URL || 'ws://localhost:3030/graphql';
export const autoLoginEnabled = AUTO_LOGIN_ENABLED;
export const defaultAdminEmail = DEFAULT_ADMIN_EMAIL || 'admin@example.com';
export const defaultAdminPassword = DEFAULT_ADMIN_PASSWORD || 'Secret123!';
