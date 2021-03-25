import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror-graphql/mode';
import 'codemirror/theme/dracula.css';
import clsx from 'clsx';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';
import { useAPIViewSchema } from '../../../presenter/ApiDefs';

export const Schema: React.FC<Props> = ({ fetcher }) => {
  const { wrapper, editor } = useStyles();
  const { value } = useAPIViewSchema(fetcher);
  const editorClassName = clsx(wrapper, editor);

  return (
    <div className={editorClassName}>
      <CodeMirror
        value={value}
        options={{
          mode: 'graphql',
          lineWrapping: true,
          tabSize: 2,
          readOnly: 'nocursor',
          theme: 'dracula',
        }}
      />
    </div>
  );
};
