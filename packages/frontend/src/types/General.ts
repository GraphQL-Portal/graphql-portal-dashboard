import React from 'react';

export type Title = { title: string };

export type Source = { source: any };

export type ElementsTable = {
  [key: string]: React.JSXElementConstructor<any>;
};
