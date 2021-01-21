import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { H6 } from '../Typography';
import { Header as Props } from './types';
import { useStyles } from './useStyles';

export const Header:React.FC<Props> = ({ title, children, startChildren }) => {
  const { root, toolbarRoot, side } = useStyles();
  return (
    <AppBar position="static" elevation={0} classes={{ root }}>
      <Toolbar classes={{ root: toolbarRoot }}>
        <div className={side}>
          {startChildren || null}
          <H6>{title}</H6>
        </div>
        <div className={side}>{children}</div>
      </Toolbar>
    </AppBar>
  );
}
