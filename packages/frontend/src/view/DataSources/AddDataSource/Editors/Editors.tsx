import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import { H6 } from '../../../../ui';
import { Editors as Props } from '../../../../types';
import { EditorCell } from './EditorCell';
import { EditorWrapper } from './EditorWrapper';

import { useStyles } from './useStyles';

export const Editors: React.FC<Props> = ({
  errors,
  control,
  source,
  title,
}) => {
  const { editor, code, schema, editorErrorHeader, editorHeader } = useStyles(
    {}
  );

  const editorClassName = clsx(editor, code);
  const schemaClassName = clsx(editor, schema);
  const editorConnectorHeader = clsx(
    editor,
    !!(errors && errors.handler) && editorErrorHeader
  );

  return (
    <>
      <EditorWrapper>
        <EditorCell>
          <H6 className={editorConnectorHeader}>Connector config:</H6>
        </EditorCell>
        <EditorCell>
          <H6 className={editorHeader}>Connector schema:</H6>
        </EditorCell>
      </EditorWrapper>
      <EditorWrapper gapBottom={4}>
        <EditorCell>
          <Controller
            control={control}
            name="handler"
            render={(props) => (
              <Editor
                htmlElementProps={{
                  className: editorClassName,
                }}
                schema={source}
                navigationBar={false}
                mode="code"
                {...props}
              />
            )}
          />
        </EditorCell>
        <EditorCell>
          <Editor
            value={source}
            name={`${title} schema`}
            htmlElementProps={{
              className: schemaClassName,
            }}
            mode="view"
            navigationBar={false}
          />
        </EditorCell>
      </EditorWrapper>
    </>
  );
};
