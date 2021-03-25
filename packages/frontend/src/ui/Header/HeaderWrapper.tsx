import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import { HeaderRow } from './HeaderRow';
import { useStyles } from './useStyles';

export const HeaderWrapper: React.FC = ({ children }) => {
  const { root, toolbarRoot } = useStyles();

  return (
    <AppBar position="static" elevation={0} classes={{ root }}>
      <Toolbar classes={{ root: toolbarRoot }}>
        <HeaderRow>{children}</HeaderRow>
      </Toolbar>
    </AppBar>
  );
};
