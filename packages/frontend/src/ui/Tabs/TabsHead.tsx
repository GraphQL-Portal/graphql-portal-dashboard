import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { TabsHead as Props } from '../../types';
import { getControlProps } from './helpers';
import { useStyles } from './useStyles';

export const TabsHead: React.FC<Props> = ({ tabsList, ...tabsSettings }) => {
  const classes = useStyles();
  console.log(classes);
  return (
    <Tabs indicatorColor="primary" textColor="primary" {...tabsSettings}>
      {tabsList.map(({ label, disabled }, idx: number) => (
        <Tab
          classes={classes}
          label={label}
          disabled={disabled}
          key={`Tab-${idx}`}
          {...getControlProps(idx)}
        />
      ))}
    </Tabs>
  );
};
