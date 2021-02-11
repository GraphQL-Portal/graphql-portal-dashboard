import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { TabsHead as Props } from '../../types';
import { getControlProps } from './helpers';

export const TabsHead: React.FC<Props> = ({ tabsList, ...tabsSettings }) => {
  return (
    <Tabs indicatorColor="primary" textColor="primary" {...tabsSettings}>
      {tabsList.map(({ label, disabled }, idx: number) => (
        <Tab
          label={label}
          disabled={disabled}
          key={`Tab-${idx}`}
          {...getControlProps(idx)}
        />
      ))}
    </Tabs>
  );
};
