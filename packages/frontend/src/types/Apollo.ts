import {
  OperationVariables,
  QueryHookOptions,
  MutationHookOptions,
} from '@apollo/client';

export type QueryOptions = QueryHookOptions<any, OperationVariables>;
export type MutationOptions = MutationHookOptions<any, OperationVariables>;
