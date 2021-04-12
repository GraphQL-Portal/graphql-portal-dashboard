import {
  AVAILABLE_HANDLERS,
  HANDLERS_DESCRIPTIONS,
  HANDLERS_LABELS,
} from '../../presenter/DataSources/constants';
import { getHandlerKey } from '../../presenter/DataSources/helpers';
import { DataSource, SourceStep } from '../../types';
import {
  ADD_SOURCE_STEPS,
  ADD_SOURCE_STEPS_WITH_CONFIGURATION,
} from './constants';
import { compose, getProp, getObjPropOr, objectKeys } from '../../utils';

export const getError = (errors: any) => (field: string) => !!errors?.[field];

/**
 * Formats the title of connector according to the mapping.
 * @param title Original Mesh Input Handler title
 */
export const formatHandlerTitle = (title: string = ''): string =>
  HANDLERS_LABELS[title] ?? title.replace('Handler', '');

/**
 * Formats the description of connector according to the mapping.
 * @param title Original Mesh Input Handler title
 * @param description Original description of the handler
 */
export const formatHandlerDescription = (
  title: string,
  description = ''
): string => HANDLERS_DESCRIPTIONS[title] ?? description;

export const formatHandlerType: (handler: DataSource) => string = compose(
  getProp('title'),
  getObjPropOr(AVAILABLE_HANDLERS, {}),
  getHandlerKey
);

export const getSourceSteps = (source: SourceStep) => {
  return objectKeys(source?.connector?.properties || {}).length > 0
    ? ADD_SOURCE_STEPS_WITH_CONFIGURATION
    : ADD_SOURCE_STEPS;
};
