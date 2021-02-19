import React from 'react';
import clsx from 'clsx';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';

import { useAPIPlayground } from '../../../presenter/ApiDefs';
import { ViewAPITab as Props } from '../../../types';
import { PrimaryButton } from '../../../ui';
import { PlayArrow } from '../../../icons';
import { useStyles } from './useStyles';

const { Logo, Toolbar, Footer } = GraphiQL;

export const Playground: React.FC<Props> = ({ fetcher, name }) => {
  const { editor, onRun } = useAPIPlayground();
  const { playground, wrapper, run } = useStyles();
  const playgroundClassName = clsx(wrapper, playground);

  return (
    <div className={playgroundClassName}>
      <GraphiQL fetcher={fetcher} query="" ref={(c) => (editor.current = c)}>
        <Logo>{name}</Logo>
        <Toolbar>{null}</Toolbar>
        <Footer>
          <PrimaryButton className={run} onMouseDown={onRun}>
            <PlayArrow />
          </PrimaryButton>
        </Footer>
      </GraphiQL>
    </div>
  );
};
