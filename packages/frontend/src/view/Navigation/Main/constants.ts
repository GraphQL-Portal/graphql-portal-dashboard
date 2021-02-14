import { ROUTES } from '../../../model/providers';
import {
  Assessment,
  AllInclusive,
  Ballot,
  DashboardRounded,
  FormatListBulleted,
  ImportContacts,
  PeopleAlt,
  Settings,
  VerticalSplit,
  GitHub,
  MailOutline,
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
        roles: [Roles.ADMIN],
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
        external: true,
      },
      {
        text: 'GitHub',
        link: ROUTES.GITHUB,
        Icon: GitHub,
        roles: [Roles.ADMIN, Roles.USER],
        external: true,
      },
      {
        text: 'Contact Us',
        link: ROUTES.CONTACT_US,
        Icon: MailOutline,
        roles: [Roles.ADMIN, Roles.USER],
        external: true,
      },
    ],
  },
];
