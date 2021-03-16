import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror-graphql/mode';
import 'codemirror/theme/dracula.css';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';
import { useAPIViewSchema } from '../../../presenter/ApiDefs';

export const Schema: React.FC<Props> = ({ fetcher }) => {
  const { wrapper } = useStyles();
  const { value } = useAPIViewSchema(fetcher);

  return (
    <div className={wrapper}>
      <CodeMirror
        value={value}
        options={{
          mode: 'graphql',
          tabSize: 2,
          readOnly: 'nocursor',
          theme: 'dracula',
        }}
      />
    </div>
  );
};
