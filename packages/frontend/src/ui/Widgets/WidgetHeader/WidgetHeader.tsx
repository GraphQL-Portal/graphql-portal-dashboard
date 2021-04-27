import React from 'react';

import { H5 } from '../../Typography';
import { WidgetHeader as Props } from '../../../types';
import { HelpTooltip } from '../../HelpTooltip';
import { useStyles } from './useStyles';

export const WidgetHeader: React.FC<Props> = ({ title, children, tooltip }) => {
  const { widgetHeader, widgetHeaderTitle, titleText } = useStyles();

  return (
    <header className={widgetHeader}>
      <div className={widgetHeaderTitle}>
        <H5 className={titleText}>{title}</H5>
        <HelpTooltip tooltip={tooltip} />
      </div>
      <div>{children}</div>
    </header>
  );
};
