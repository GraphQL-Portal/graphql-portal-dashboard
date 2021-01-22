import React from 'react';
import { Help } from '@material-ui/icons';

import { H5 } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { WidgetHeader as Props } from '../types';
import { useStyles } from './useStyles';

export const WidgetHeader:React.FC<Props> = ({ title, children, tooltip }) => {
  const { widgetHeader, widgetHeaderTitle, titleText, iconRoot } = useStyles();

  return (
    <header className={widgetHeader}>
      <div className={widgetHeaderTitle}>
        <H5 className={titleText}>{title}</H5>
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
