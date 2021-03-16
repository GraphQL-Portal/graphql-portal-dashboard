import React from 'react';
import GraphiQL from 'graphiql';
import clsx from 'clsx';
import 'graphiql/graphiql.css';
import 'codemirror/theme/dracula.css';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';

const { Logo, Toolbar } = GraphiQL;

export const Playground: React.FC<Props> = ({ fetcher, name }) => {
  const { wrapper, playground } = useStyles();

  const playgroundClassName = clsx(wrapper, playground);

  return (
    <div className={playgroundClassName}>
      <GraphiQL fetcher={fetcher} query="" editorTheme="dracula">
        <Logo>{name}</Logo>
        <Toolbar>{null}</Toolbar>
      </GraphiQL>
    </div>
  );
};
