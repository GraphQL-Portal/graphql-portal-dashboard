import { sourceSchema } from '@graphql-portal/types';

import { getAvailableSources } from './helpers';
import { SourceSchema } from './types';

const RAW_SOURCE_SCHEMA: SourceSchema = sourceSchema.definitions;

export const AVAILABLE_SOURCE_SCHEMAS = getAvailableSources(RAW_SOURCE_SCHEMA);
