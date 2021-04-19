import { Tooltip } from './Tooltip';

export type HelpTooltip = {
  tooltip?: string;
} & Omit<Tooltip, 'children' | 'title'>;
