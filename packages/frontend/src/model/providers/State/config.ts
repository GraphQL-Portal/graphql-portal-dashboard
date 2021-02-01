const { REACT_APP_DASHBOARD_URL, REACT_APP_DASHBOARD_WS_URL } = process.env;

export const URI = REACT_APP_DASHBOARD_URL || 'http://localhost:3030/graphql';
export const wsURI =
  REACT_APP_DASHBOARD_WS_URL || 'ws://localhost:3030/graphql';
