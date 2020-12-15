import React from 'react';
import clsx from 'clsx';
import { Drawer } from '@material-ui/core';

import { MainNavigation } from '../Navigation';
import { useStyles } from './useStyles';

export const Sidebar:React.FC = () => {
  const { drawer, paper } = useStyles();
  return (
    <Drawer className={drawer} variant="permanent" classes={{ paper: clsx(drawer, paper) }}>
      <MainNavigation />
    </Drawer>
  );
}
