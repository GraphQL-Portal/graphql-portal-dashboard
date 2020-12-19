import React from 'react';
import { Help } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

import { H6 } from '../../Typography';
import { WidgetHeader as Type } from '../types';
import { useStyles } from './useStyles';

export const WidgetHeader:React.FC<Type> = ({ title, fullWidth, children, tooltip }) => {
  const { widgetHeader, widgetHeaderTitle, titleText, iconRoot, tooltipRoot, arrow } = useStyles({ fullWidth });

  return (
    <header className={widgetHeader}>
      <div className={widgetHeaderTitle}>
        <H6 className={titleText}>{title}</H6>
        {tooltip && (
          <Tooltip title={tooltip} leaveDelay={90000} classes={{ tooltip: tooltipRoot, arrow }} arrow interactive>
            <Help fontSize="small" classes={{ root: iconRoot }} />
          </Tooltip>
        )}
      </div>
      <div>{children}</div>
    </header>
  );
}
