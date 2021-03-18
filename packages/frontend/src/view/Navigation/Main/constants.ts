import {
  Assessment,
  // AllInclusive,
  Ballot,
  DashboardRounded,
  FormatListBulleted,
  ImportContacts,
  PeopleAlt,
  // Settings,
  VerticalSplit,
  GitHub,
  MailOutline,
} from '../../../icons';
import { ROUTES } from '../../../model/providers';
import { ROLE_ADMIN, ROLE_USER } from '../../../model/providers/Auth/constants';
import { NavigationGroup } from '../../../types';

export const GROUPS: NavigationGroup[] = [
  {
    items: [
      {
        text: 'Dashboard',
        link: ROUTES.DASHBOARD,
        Icon: DashboardRounded,
        roles: [ROLE_ADMIN, ROLE_USER],
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
        roles: [ROLE_ADMIN, ROLE_USER],
      },
      {
        text: 'My Data Sources',
        link: ROUTES.DATA_SOURCES,
        Icon: VerticalSplit,
        roles: [ROLE_ADMIN, ROLE_USER],
      },
      {
        text: 'Metrics & Logs',
        link: ROUTES.METRICS_AND_LOGS,
        Icon: Assessment,
        roles: [ROLE_ADMIN, ROLE_USER],
      },
      {
        text: 'Logs',
        link: ROUTES.LOGS,
        Icon: Ballot,
        roles: [Roles.ADMIN],
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
        roles: [ROLE_ADMIN],
      },
      // {
      //   text: 'Global settings',
      //   link: ROUTES.GLOBAL,
      //   Icon: Settings,
      //   roles: [ROLE_ADMIN, ROLE_USER],
      // },
      // {
      //   text: 'Webhooks',
      //   link: ROUTES.WEBHOOKS,
      //   Icon: AllInclusive,
      //   roles: [ROLE_ADMIN, ROLE_USER],
      // },
      {
        text: 'Gateway nodes',
        link: ROUTES.NODES,
        Icon: Ballot,
        roles: [ROLE_ADMIN],
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
        roles: [ROLE_ADMIN, ROLE_USER],
        external: true,
      },
      {
        text: 'GitHub',
        link: ROUTES.GITHUB,
        Icon: GitHub,
        roles: [ROLE_ADMIN, ROLE_USER],
        external: true,
      },
      {
        text: 'Contact Us',
        link: ROUTES.CONTACT_US,
        Icon: MailOutline,
        roles: [ROLE_ADMIN, ROLE_USER],
        external: true,
      },
    ],
  },
];
