import {
  OperationVariables,
  QueryHookOptions,
  MutationHookOptions,
  MutationFunctionOptions,
  FetchResult,
  ApolloQueryResult,
  ApolloError,
} from '@apollo/client';

type RecordStringAny = Record<string, any>;

export type QueryOptions = QueryHookOptions<any, OperationVariables>;
export type MutationOptions = MutationHookOptions<any, OperationVariables>;
export type Refetch = (
  variables?: Partial<RecordStringAny> | undefined
) => Promise<ApolloQueryResult<any>>;

export type AError = ApolloError;

export type MutationFunction = (
  options?: MutationFunctionOptions<any, RecordStringAny> | undefined
) => Promise<FetchResult<any, RecordStringAny, RecordStringAny>>;

export type MutationHook<T extends string> = (
  options: MutationOptions
) => Record<T, MutationFunction>;

export type QueryHook<T> = (
  options?: QueryOptions
) => {
  data: T;
  loading: boolean;
  error?: ApolloError;
  refetch?: Refetch;
};
