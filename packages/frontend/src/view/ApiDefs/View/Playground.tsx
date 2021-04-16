import React from 'react';
import GraphiQL from 'graphiql';
import clsx from 'clsx';
import 'graphiql/graphiql.css';
import 'codemirror/theme/dracula.css';

import { ViewAPITab as Props } from '../../../types';
import { useTourContext } from '../../../model/providers';
import { useStyles } from './useStyles';

const { Logo, Toolbar } = GraphiQL;

export const Playground: React.FC<Props> = ({ fetcher, name }) => {
  const { tour } = useTourContext();
  const { wrapper, playground } = useStyles();
  const playgroundClassName = clsx(wrapper, playground);
  const query = tour.query && tour.api.name === name ? tour.query : '';

  return (
    <div className={playgroundClassName}>
      <GraphiQL fetcher={fetcher} query={query} editorTheme="dracula">
        <Logo>{name}</Logo>
        <Toolbar>{null}</Toolbar>
      </GraphiQL>
    </div>
  );
};
