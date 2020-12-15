import React from 'react';
import clsx from 'clsx';
import { Drawer } from '@material-ui/core';

import { useStyles } from './styles';
import { MainNavigation } from '../Navigation';

export const Sidebar:React.FC = () => {
  const { drawer, paper } = useStyles();
  return (
    <Drawer className={drawer} variant="permanent" classes={{ paper: clsx(drawer, paper) }}>
      <MainNavigation />
    </Drawer>
  );
}
