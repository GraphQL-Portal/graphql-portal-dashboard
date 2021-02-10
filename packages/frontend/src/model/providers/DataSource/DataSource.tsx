import React, { createContext, useContext, useState } from 'react';
import { DataSource } from './types';

const DataSourceContext = createContext<DataSource | null>(null);
export const useDataSourceContext = () => useContext(DataSourceContext)!;

const { Provider } = DataSourceContext;

export const DataSourceProvider: React.FC = ({ children }) => {
  const [source, setSource] = useState(null);

  const clearSource = () => setSource(null);

  return (
    <Provider value={{ clearSource, setSource, source }}>{children}</Provider>
  );
};
