import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/theme/dracula.css';

import { buildClientSchema, printSchema, getIntrospectionQuery } from 'graphql';
import fetch from 'isomorphic-fetch';

import { useStyles } from './useStyles';
import { URI } from '../../../model/providers/State/config';
import { compose, getProp } from '../../../utils';
import clsx from 'clsx';

const INTROSPECTION_PAYLOAD = {
  operationName: 'IntrospectionQuery',
  query: getIntrospectionQuery(),
};

const getEditorSchema = compose(
  printSchema,
  buildClientSchema,
  getProp('data')
);

export const Schema: React.FC = () => {
  const { playground, editor } = useStyles();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const getSchema = async () => {
      const schema = await fetch(URI, {
        method: 'POST',
        body: JSON.stringify(INTROSPECTION_PAYLOAD),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmYyZTJjOTI0MWIxZTNmM2VkM2MxZjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTM2MzY3MTgsImV4cCI6MTYxMzcyMzExOH0.WPfKqxnKwhBVWHHkfgYIotc9XBLp2TX9JYbUJmH6erw',
        },
      }).then(response => response.json().catch(() => response.text()));

      setValue(getEditorSchema(schema));
    };

    getSchema();
  }, []);

  const className = clsx(playground, editor);

  return (
    <div className={className}>
      <CodeMirror
        value={value}
        options={{
          theme: 'dracula',
          mode: 'graphql',
          tabSize: 2,
          readOnly: 'nocursor',
        }}
      />
    </div>
  );
};
