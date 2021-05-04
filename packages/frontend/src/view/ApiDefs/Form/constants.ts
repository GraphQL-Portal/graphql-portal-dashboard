import { WebhookEvent } from '@graphql-portal/types';
import { SelectOption } from '../../../types';

export const WEBHOOKS_OPTIONS: SelectOption[] = [
  {
    value: WebhookEvent.SCHEMA_CHANGED,
    label: 'Schema changed',
  },
];
