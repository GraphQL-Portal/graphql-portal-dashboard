import React, { useRef } from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import { URI } from '../../../model/providers/State/config';
import 'graphiql/graphiql.css';

import { useStyles } from './useStyles';

const fetcher = (graphQLParams: any) =>
  fetch(URI, {
    method: 'POST',
    body: JSON.stringify(graphQLParams),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmYyZTJjOTI0MWIxZTNmM2VkM2MxZjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTM2MzY3MTgsImV4cCI6MTYxMzcyMzExOH0.WPfKqxnKwhBVWHHkfgYIotc9XBLp2TX9JYbUJmH6erw',
    },
  }).then(response => response.json().catch(() => response.text()));

export const Playground: React.FC = () => {
  const editor = useRef<GraphiQL | null>();
  const { playground } = useStyles();

  // const onRun = () => editor.current!.handleRunQuery();

  return (
    <div className={playground}>
      <GraphiQL
        fetcher={fetcher}
        query=""
        ref={c => (editor.current = c)}
        editorTheme="yonce"
      >
        <GraphiQL.Logo>Logo</GraphiQL.Logo>
        <GraphiQL.Toolbar>{null}</GraphiQL.Toolbar>
      </GraphiQL>
    </div>
  );
};
