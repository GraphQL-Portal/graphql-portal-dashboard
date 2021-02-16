import {
  OperationVariables,
  QueryHookOptions,
  MutationHookOptions,
  ApolloQueryResult,
} from '@apollo/client';

export type QueryOptions = QueryHookOptions<any, OperationVariables>;
export type MutationOptions = MutationHookOptions<any, OperationVariables>;
export type Refetch = (
  variables?: Partial<Record<string, any>> | undefined
) => Promise<ApolloQueryResult<any>>;
