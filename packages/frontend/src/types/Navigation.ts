import React from 'react';

import { Role } from './User';

export type GroupItem = {
  text: string;
  link: string;
  roles: Role[];
  Icon: React.JSXElementConstructor<{}>;
  external?: boolean;
};

export type NavigationGroup = {
  name?: string;
  items: GroupItem[];
};
