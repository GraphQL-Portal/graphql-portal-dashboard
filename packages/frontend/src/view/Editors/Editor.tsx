import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import { useStyles } from './useStyles';
import clsx from 'clsx';
import { RecordStringAny as Props } from '../../types';

export const JsonEditor: React.FC<Props> = ({
  className,
  mode,
  schema,
  ...editorProps
}) => {
  const { editor } = useStyles();
  const editorClassName = clsx(editor, className);

  return (
    <Editor
      htmlElementProps={{ className: editorClassName }}
      schema={schema || {}}
      navigationBar={false}
      mode={mode || 'code'}
      {...editorProps}
    />
  );
};
