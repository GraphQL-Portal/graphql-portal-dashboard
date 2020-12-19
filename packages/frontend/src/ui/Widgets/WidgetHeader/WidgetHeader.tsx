import React from 'react';
import { Help } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

import { H6 } from '../../Typography';
import { WidgetHeader as Type } from '../types';
import { useStyles } from './useStyles';

export const WidgetHeader:React.FC<Type> = ({ title, fullWidth, children }) => {
  const { widgetHeader, widgetHeaderTitle, titleText, iconRoot, tooltip, arrow } = useStyles({ fullWidth });

  return (
    <header className={widgetHeader}>
      <div className={widgetHeaderTitle}>
        <H6 className={titleText}>{title}</H6>
        <Tooltip title="tolltip here" arrow leaveDelay={90000} classes={{ tooltip, arrow }} interactive>
          <Help fontSize="small" classes={{ root: iconRoot }} />
        </Tooltip>
      </div>
      <div>{children}</div>
    </header>
  );
}
