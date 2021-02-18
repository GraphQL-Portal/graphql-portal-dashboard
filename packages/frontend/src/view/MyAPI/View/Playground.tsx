import React, { useRef } from 'react';
import clsx from 'clsx';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';
const { Logo, Toolbar } = GraphiQL;

export const Playground: React.FC<Props> = ({ fetcher }) => {
  const editor = useRef<GraphiQL | null>();
  const { playground, wrapper } = useStyles();
  const playgroundClassName = clsx(wrapper, playground);

  return (
    <div className={playgroundClassName}>
      <GraphiQL fetcher={fetcher} query="" ref={(c) => (editor.current = c)}>
        <Logo>Logo</Logo>
        <Toolbar>{null}</Toolbar>
      </GraphiQL>
    </div>
  );
};
