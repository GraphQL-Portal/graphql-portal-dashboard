import React, { createContext, useContext, useState } from 'react';
import { DataSourceContext as Context } from '../../../types';

const DataSourceContext = createContext<Context | null>(null);
export const useDataSourceContext = () => useContext(DataSourceContext)!;

const { Provider } = DataSourceContext;

export const DataSourceProvider: React.FC = ({ children }) => {
  const [source, setSource] = useState(null);

  const clearSource = () => setSource(null);

  return (
    <Provider value={{ clearSource, setSource, source }}>{children}</Provider>
  );
};
