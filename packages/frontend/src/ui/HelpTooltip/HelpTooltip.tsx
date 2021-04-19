import React from 'react';

import { HelpTooltip as Props } from '../../types';
import { Help } from '../../icons';
import { Tooltip } from '../Tooltip';
import { useStyles } from './useStyles';

export const HelpTooltip: React.FC<Props> = ({ tooltip, ...tooltipProps }) => {
  const { root } = useStyles();

  if (!tooltip) return null;
  return (
    <Tooltip {...tooltipProps} title={tooltip}>
      <Help fontSize="small" classes={{ root }} />
    </Tooltip>
  );
};
