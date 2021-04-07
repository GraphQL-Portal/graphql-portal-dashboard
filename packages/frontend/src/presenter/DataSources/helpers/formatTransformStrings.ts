import { TRANSFORM_DESCRIPTIONS, TRANSFORMS_LABELS } from '../constants';
import { capitalize } from '@material-ui/core';

/**
 * Modify Transform label (name) according to the mapping
 * @param label Original name (label) of the Transform
 */
export const formatTransformStrings = (label: string): string =>
  TRANSFORMS_LABELS[label] ?? capitalize(label);

/**
 * Modify description of a Transform according to the mapping
 * @param key Transform name
 * @param description Original Transform description
 */
export const formatTransformDescription = (
  key: string,
  description: string = ''
): string => TRANSFORM_DESCRIPTIONS[key] ?? description;
