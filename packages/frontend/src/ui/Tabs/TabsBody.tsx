import React, { Children } from 'react';

import { TabsBody as Props } from '../../types';
import { getTabPanelProps } from './helpers';

export const TabsBody: React.FC<Props> = ({ children, value }) => {
  return (
    <>
      {Children.map(children, (child, idx) => {
        if (idx === value) {
          return React.cloneElement(child as React.ReactElement<any>, {
            role: 'tabpanel',
            ...getTabPanelProps(idx),
          });
        }
      })}
    </>
  );
};
