import React from 'react';

export type Title = { title: string };

export type Source = { source: any };

export type Table<T> = { [key: string]: T };

export type ElementsTable = Table<React.JSXElementConstructor<any>>;

export type DeepObject = {
  [key: string]: string | number | DeepObject;
};

export type TriggersTable = Table<boolean>;
export type AnyTable = Table<any>;
