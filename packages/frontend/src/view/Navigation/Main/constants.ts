import { ROUTES } from "../../../model/providers";

export const GROUPS = [{
  items: [{
    text: 'Dashboard',
    link: ROUTES.DASHBOARD,
  }]
}, {
  name: 'API Management',
  items: [
    {
      text: 'Your APIs',
      link: ROUTES.APIS,
    },
    {
      text: 'Back-end data sources',
      link: ROUTES.DATA_SOURCES,
    },
    {
      text: 'Metrics & Logs',
      link: ROUTES.METRICS_AND_LOGS,
    },
  ],
}, {
  name: 'Settings',
  items: [
    {
      text: 'Users & Permissions',
      link: ROUTES.USERS,
    },
    {
      text: 'Global settings',
      link: ROUTES.GLOBAL,
    },
    {
      text: 'Webhooks',
      link: ROUTES.WEBHOOKS,
    },
    {
      text: 'Gateway nodes',
      link: ROUTES.NODES,
    },
  ],
}, {
  name: 'Help',
  items: [
    {
      text: 'Documentation',
      link: ROUTES.DOCUMENTATION,
    },
    {
      text: 'Support forum',
      link: ROUTES.SUPPORT,
    },
    {
      text: 'Professional services',
      link: ROUTES.SERVICES,
    },
  ],
}];
