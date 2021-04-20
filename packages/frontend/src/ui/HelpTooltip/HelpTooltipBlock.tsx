import clsx from 'clsx';
import React from 'react';

import { HelpTooltip as Props } from '../../types';
import { HelpTooltip } from './HelpTooltip';
import { useStyles } from './useStyles';

export const HelpTooltipBlock: React.FC<Props> = ({
  children,
  className,
  ...tooltipProps
}) => {
  const { block, tooltipWrapper } = useStyles();
  const blockClassName = clsx(className, block);
  return (
    <div className={blockClassName}>
      {children}
      <span className={tooltipWrapper}>
        <HelpTooltip {...tooltipProps} />
      </span>
    </div>
  );
};
