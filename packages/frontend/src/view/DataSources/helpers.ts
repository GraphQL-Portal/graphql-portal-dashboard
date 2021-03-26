import {
  AVAILABLE_HANDLERS,
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

export const formatHandlerTitle = (title: string = ''): string =>
  HANDLERS_LABELS[title] ?? title.replace('Handler', '');

export const formatHandlerType: (handler: DataSource) => string = compose(
  formatHandlerTitle,
  getProp('title'),
  getObjPropOr(AVAILABLE_HANDLERS, {}),
  getHandlerKey
);

export const getSourceSteps = (source: SourceStep) => {
  return objectKeys(source?.connector?.properties || {}).length > 0
    ? ADD_SOURCE_STEPS_WITH_CONFIGURATION
    : ADD_SOURCE_STEPS;
};
