export const LOGIN = '/login';
export const SIGN_UP = '/sign-up';
export const RESET_PASSWORD_REQUEST = '/reset-password-request';
export const RESET_PASSWORD = '/reset-password';
export const CONFIRM_EMAIL = '/confirm-email';

export const MAIN = '/';
export const DASHBOARD = '/dashboard';

// API Management
export const APIS = '/my-apis';
export const API_CREATE = `${APIS}/new`;
export const API_EDIT = `${APIS}/edit/:id`;
export const API_VIEW = `${APIS}/:id`;

// Data Source
export const DATA_SOURCES = '/data-sources';
export const DATA_SOURCE_ADD = `${DATA_SOURCES}/add`;
export const DATA_SOURCE_EDIT = `${DATA_SOURCES}/edit`;

export const METRICS_AND_LOGS = '/metrics-and-logs';
export const API_METRICS = `${METRICS_AND_LOGS}/:id`;
export const LOGS = '/logs';

// Settings
export const USERS = '/users-and-permissions';
export const GLOBAL = '/global-settings';
export const WEBHOOKS = '/webhooks';
export const NODES = '/gateway-nodes';

// Help
export const DOCUMENTATION = 'https://docs.graphql-portal.com';
export const GITHUB = 'https://github.com/graphql-portal/graphql-portal';
export const CONTACT_US = 'mailto:contact@code.store?subject=GraphQL';
