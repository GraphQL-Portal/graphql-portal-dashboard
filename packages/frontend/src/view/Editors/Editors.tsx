import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';
import { HandlerRow, HandlerCol } from '../DataSources/Layout';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import { Editors as Props } from '../../types';
import { H6 } from '../../ui';
import { useStyles } from './useStyles';

export const Editors: React.FC<Props> = ({
  control,
  source,
  errors,
  title,
  name,
}) => {
  const { editor, code, schema, editorErrorHeader } = useStyles();

  const editorClassName = clsx(editor, code);
  const schemaClassName = clsx(editor, schema);
  const editorConnectorHeader = clsx(!!errors?.handler && editorErrorHeader);

  return (
    <>
      <HandlerRow>
        <HandlerCol>
          <H6 className={editorConnectorHeader}>{`${title} config:`}</H6>
        </HandlerCol>
        <HandlerCol>
          <H6>{`${title} schema:`}</H6>
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Controller
            control={control}
            name={name}
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
        </HandlerCol>
        <HandlerCol>
          <Editor
            value={source}
            name={`${title} schema:`}
            htmlElementProps={{
              className: schemaClassName,
            }}
            mode="view"
            navigationBar={false}
          />
        </HandlerCol>
      </HandlerRow>
    </>
  );
};
