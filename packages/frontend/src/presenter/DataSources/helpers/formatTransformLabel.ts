import { TRANSFORMS_LABELS } from '../constants';
import { capitalize } from '@material-ui/core';

export const formatTransformLabel = (label: string): string =>
  TRANSFORMS_LABELS[label] ?? capitalize(label);
