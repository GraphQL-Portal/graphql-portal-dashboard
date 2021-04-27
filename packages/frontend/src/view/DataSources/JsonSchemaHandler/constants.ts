import { SelectOption } from '../../../types';

export const METHOD_OPTIONS: SelectOption[] = [
  { label: 'GET', value: 'GET' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'PATCH', value: 'PATCH' },
];

export const TYPE_OPTIONS: SelectOption[] = [
  { label: 'Query', value: 'Query' },
  { label: 'Mutation', value: 'Mutation' },
  { label: 'Subscription', value: 'Subscription' },
];
