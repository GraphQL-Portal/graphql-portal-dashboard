import { ROUTES } from '../../../model/providers';
import {
  Assessment,
  AllInclusive,
  Ballot,
  Build,
  DashboardRounded,
  FormatListBulleted,
  Forum,
  ImportContacts,
  PeopleAlt,
  Settings,
  VerticalSplit,
} from '@material-ui/icons';
import { Roles } from '../../../model/providers/Auth/constants';

export const GROUPS = [
  {
    items: [
      {
        text: 'Dashboard',
        link: ROUTES.DASHBOARD,
        Icon: DashboardRounded,
        roles: [Roles.ADMIN, Roles.USER],
      },
    ],
  },
  {
    name: 'API Management',
    items: [
      {
        text: 'My APIs',
        link: ROUTES.APIS,
        Icon: FormatListBulleted,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'My Data Sources',
        link: ROUTES.DATA_SOURCES,
        Icon: VerticalSplit,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'Metrics & Logs',
        link: ROUTES.METRICS_AND_LOGS,
        Icon: Assessment,
        roles: [Roles.ADMIN, Roles.USER],
      },
    ],
  },
  {
    name: 'Settings',
    items: [
      {
        text: 'Users & Permissions',
        link: ROUTES.USERS,
        Icon: PeopleAlt,
        roles: [Roles.ADMIN],
      },
      {
        text: 'Global settings',
        link: ROUTES.GLOBAL,
        Icon: Settings,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'Webhooks',
        link: ROUTES.WEBHOOKS,
        Icon: AllInclusive,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'Gateway nodes',
        link: ROUTES.NODES,
        Icon: Ballot,
        roles: [Roles.ADMIN, Roles.USER],
      },
    ],
  },
  {
    name: 'Help',
    items: [
      {
        text: 'Documentation',
        link: ROUTES.DOCUMENTATION,
        Icon: ImportContacts,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'Support forum',
        link: ROUTES.SUPPORT,
        Icon: Forum,
        roles: [Roles.ADMIN, Roles.USER],
      },
      {
        text: 'Professional services',
        link: ROUTES.SERVICES,
        Icon: Build,
        roles: [Roles.ADMIN, Roles.USER],
      },
    ],
  },
];
