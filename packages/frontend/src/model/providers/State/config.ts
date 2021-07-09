const runtimeEnv = (window as any).env || {};
const env = Object.assign({}, process.env, runtimeEnv);

const {
  REACT_APP_DASHBOARD_URL,
  REACT_APP_DASHBOARD_WS_URL,
  REACT_APP_AUTO_LOGIN_ENABLED,
  REACT_APP_DEFAULT_ADMIN_EMAIL,
  REACT_APP_DEFAULT_ADMIN_PASSWORD,
} = env;

export const URI = REACT_APP_DASHBOARD_URL || 'http://localhost:3030/graphql';
export const wsURI =
  REACT_APP_DASHBOARD_WS_URL || 'ws://localhost:3030/graphql';
export const autoLoginEnabled = REACT_APP_AUTO_LOGIN_ENABLED;
export const defaultAdminEmail =
  REACT_APP_DEFAULT_ADMIN_EMAIL || 'admin@example.com';
export const defaultAdminPassword =
  REACT_APP_DEFAULT_ADMIN_PASSWORD || 'Secret123!';
