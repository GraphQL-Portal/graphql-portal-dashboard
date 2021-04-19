import { ReactNode } from 'react';
import { Tooltip } from './Tooltip';

export type HelpTooltip = {
  tooltip?: ReactNode;
} & Omit<Tooltip, 'children' | 'title'>;
