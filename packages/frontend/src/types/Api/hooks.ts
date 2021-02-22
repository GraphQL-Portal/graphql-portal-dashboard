import React from 'react';
import { QueryHook } from '../Apollo';
import { ControlType, OnSubmit } from '../HookForm';
import { SelectOption } from '../Forms';
import { NOOP } from '../General';
import { UseTabsHook } from '../Tabs';
import GraphiQL from 'graphiql';
import { ApiDef } from './data';
import { EditApiTab } from './components';
import { Fetcher } from './methods';

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
