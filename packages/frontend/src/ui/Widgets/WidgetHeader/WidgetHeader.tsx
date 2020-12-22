import React from 'react';
import { Help } from '@material-ui/icons';


import { H6 } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { WidgetHeader as Type } from '../types';
import { useStyles } from './useStyles';

export const WidgetHeader:React.FC<Type> = ({ title, children, tooltip }) => {
  const { widgetHeader, widgetHeaderTitle, titleText, iconRoot } = useStyles();

  return (
    <header className={widgetHeader}>
      <div className={widgetHeaderTitle}>
        <H6 className={titleText}>{title}</H6>
        {tooltip && (
          <Tooltip title={tooltip} interactive>
            <Help fontSize="small" classes={{ root: iconRoot }} />
          </Tooltip>
        )}
      </div>
      <div>{children}</div>
    </header>
  );
}
