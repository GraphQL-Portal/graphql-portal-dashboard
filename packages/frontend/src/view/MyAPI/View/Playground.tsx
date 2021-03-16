import React, { useRef } from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import 'codemirror/theme/dracula.css';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';

const { Logo, Toolbar } = GraphiQL;

export const Playground: React.FC<Props> = ({ fetcher, name }) => {
  const editor = useRef<GraphiQL | null>();
  const { wrapper } = useStyles();

  return (
    <div className={wrapper}>
      <GraphiQL
        fetcher={fetcher}
        query=""
        ref={(c) => (editor.current = c)}
        editorTheme="dracula"
      >
        <Logo>{name}</Logo>
        <Toolbar>{null}</Toolbar>
      </GraphiQL>
    </div>
  );
};
