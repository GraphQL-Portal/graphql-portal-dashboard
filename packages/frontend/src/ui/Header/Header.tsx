import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { H6 } from '../Typography';
import { Header as Type } from './types';
import { useStyles } from './useStyles';

export const Header:React.FC<Type> = ({ title, children }) => {
  const { root, toolbarRoot, rightSide } = useStyles();
  return (
    <AppBar position="static" elevation={0} classes={{ root }}>
      <Toolbar classes={{ root: toolbarRoot }}>
        <H6>{title}</H6>
        <div className={rightSide}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
