import {
  AVAILABLE_HANDLERS,
  HANDLERS_LABELS,
} from '../../presenter/DataSources/constants';
import { getHandlerKey } from '../../presenter/DataSources/helpers';
import { DataSource } from '../../types';
import { compose, getProp, getObjPropOr } from '../../utils';

export const getError = (errors: any) => (field: string) => !!errors?.[field];

export const formatHandlerTitle = (title: string = ''): string =>
  HANDLERS_LABELS[title] ?? title.replace('Handler', '');

export const formatHandlerType: (handler: DataSource) => string = compose(
  formatHandlerTitle,
  getProp('title'),
  getObjPropOr(AVAILABLE_HANDLERS, {}),
  getHandlerKey
);
