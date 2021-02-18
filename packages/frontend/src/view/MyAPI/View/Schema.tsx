import React from 'react';
import clsx from 'clsx';
import CodeMirror from '@uiw/react-codemirror';

import { ViewAPITab as Props } from '../../../types';
import { useStyles } from './useStyles';
import { useAPIViewSchema } from '../../../presenter/ApiDefs';

export const Schema: React.FC<Props> = ({ fetcher }) => {
  const { wrapper, editor } = useStyles();
  const { value } = useAPIViewSchema(fetcher);

  const className = clsx(wrapper, editor);

  return (
    <div className={className}>
      <CodeMirror
        value={value}
        options={{
          mode: 'graphql',
          tabSize: 2,
          readOnly: 'nocursor',
        }}
      />
    </div>
  );
};
