import React from 'react';

export type Header = {
  title: string;
  startChildren?: React.ReactNode;
};

export type HeaderBackButton = {
  to: string;
  title: string;
};
