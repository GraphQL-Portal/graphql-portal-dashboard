import React, { MutableRefObject } from 'react';
import { QueryHook, Refetch } from '../Apollo';
import {
  ControlType,
  FieldArray,
  FieldArrayAppend,
  FieldArrayRemove,
  OnSubmit,
} from '../HookForm';
import { SelectOption } from '../Forms';
import { AnyTable, NOOP } from '../General';
import { UseTabsHook } from '../Tabs';
import { DataSource } from '../DataSource';
import GraphiQL from 'graphiql';
import { AdditionalResolver, ApiDef } from './data';
import { EditApiTab } from './components';
import { Fetcher } from './methods';
import { AdditionalResolverFormMethods, ApiDefFormMethods } from './forms';

export type UseApiByIdHook = () => ReturnType<QueryHook<ApiDef>> &
  ReturnType<UseTabsHook>;

export type UseUpdateDataSourcesHook = (
  props: EditApiTab
) => {
  onSubmit: OnSubmit;
  options: SelectOption[];
  connected: any[];
  onAddSource: NOOP;
  onRemoveSource(idx: number): NOOP;
  loading: boolean;
} & ControlType;

export type UseViewAPIHook = () => ReturnType<UseApiByIdHook> & {
  fetcher: Fetcher;
};

export type UseMyAPIHook = () => ReturnType<QueryHook<ApiDef[]>> & {
  onDelete(api: ApiDef): NOOP;
  onUpdate(api: ApiDef): NOOP;
  onCreate: NOOP;
  onView(api: ApiDef): NOOP;
};

export type UseAPIViewSchemaHook = (fetcher: Fetcher) => { value: string };
export type UseAPIPlaygroundHook = () => {
  onRun(evt: React.MouseEvent<HTMLButtonElement>): void;
  editor: React.MutableRefObject<GraphiQL | null | undefined>;
};

export type UseDSPartHook = (
  params: Pick<ApiDefFormMethods, 'control' | 'watch' | 'setValue'> &
    Partial<Pick<ApiDefFormMethods, 'reset'>>
) => {
  options: SelectOption[];
  connected: DataSource[];
  sourceFields: FieldArray;
  onRemoveSource(idx: number): NOOP;
  onAddSource: NOOP;
  sourceTable: MutableRefObject<AnyTable>;
  loading: boolean;
};

export type UseIPFilteringHook = (
  params: Pick<ApiDefFormMethods, 'control'>
) => {
  allowedIP: FieldArray;
  addAllowedIP: FieldArrayAppend;
  removeAllowedIP: FieldArrayRemove;
  deniedIP: FieldArray;
  addDeniedIP: FieldArrayAppend;
  removeDeniedIP: FieldArrayRemove;
  enableIPFiltering: boolean;
};

export type UseCreateApiDefHook = () => Pick<
  ApiDefFormMethods,
  'register' | 'control' | 'errors'
> &
  Omit<ReturnType<UseDSPartHook>, 'sourceTable' | 'sourceFields'> & {
    onSubmit: OnSubmit;
    tokenFields: FieldArray;
    addToken: FieldArrayAppend;
    removeToken: FieldArrayRemove;
  } & ReturnType<UseIPFilteringHook>;

export type UseUpdateGeneralHook = (
  props: EditApiTab
) => Pick<
  ReturnType<UseCreateApiDefHook>,
  | 'onSubmit'
  | 'register'
  | 'control'
  | 'errors'
  | 'tokenFields'
  | 'addToken'
  | 'removeToken'
>;

export type UseUpdateSchemaAndLimitsHook = (
  props: EditApiTab
) => Pick<
  ReturnType<UseCreateApiDefHook>,
  'register' | 'control' | 'errors'
> & { onSubmit: OnSubmit };

export type UseUpdateIPFilteringHook = (
  props: EditApiTab
) => Pick<ReturnType<UseCreateApiDefHook>, 'control' | 'errors'> &
  ReturnType<UseIPFilteringHook> & { onSubmit: OnSubmit };

export type UseAdditionalResolverHook = (
  props: EditApiTab
) => Pick<AdditionalResolverFormMethods, 'register' | 'errors'> & {
  onSubmit: OnSubmit;
  resolvers: FieldArray;
  onAddResolver: FieldArrayAppend;
  onRemoveResolver: FieldArrayRemove;
};

export type UseEnableApiHook = (props: {
  api: ApiDef;
  refetch: Refetch;
}) => {
  onChange(value: boolean): void;
  value: boolean;
  disabled: boolean;
};
