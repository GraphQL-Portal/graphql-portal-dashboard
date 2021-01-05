import { sourceSchema } from '@graphql-portal/types';

import { getAvailableSources, getHandlers } from './helpers';

const handlers = getHandlers(sourceSchema);

export const AVAILABLE_DATA_SOURCES = getAvailableSources(handlers, sourceSchema);
export const RAW_SOURCE_SCHEMA = sourceSchema;
