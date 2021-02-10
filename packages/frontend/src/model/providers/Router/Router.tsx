import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const Router: React.FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
