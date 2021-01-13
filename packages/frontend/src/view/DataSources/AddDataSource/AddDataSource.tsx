import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
// import Ajv from 'ajv';

import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import { WidgetRow, HugeWidget, WidgetHeader, WidgetBody, H6 } from '../../../ui';
import { EditorCell } from './EditorCell';
import { FormCaption } from './FormCaption';
import { useStyles } from './useStyles';


export const AddDataSource:React.FC = () => {
  const [value, setValue] = useState<any>({});
  const { source } = useAddDataSource();
  const { visibleOverflow, editorsWrapper, editor, code, schema, editorHeader } = useStyles();

  const editorClassName = clsx(editor, code);
  const schemaClassName = clsx(editor, schema);

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />
  const onChange = (value: any) => setValue(value);

  const { title, description } = source;

  return (
    <>
      <Helmet>
        <title>Add new connector</title>
      </Helmet>
      <WidgetRow>
        <HugeWidget className={visibleOverflow}>
          <WidgetHeader title="Configure a data source" />
          <WidgetBody>
            <FormCaption
              title={title}
              description={description}
            />
            <section className={editorsWrapper}>
              <EditorCell>
                <H6 className={editorHeader}>Connector config:</H6>
              </EditorCell>
              <EditorCell>
                <H6 className={editorHeader}>Connector schema:</H6>
              </EditorCell>
            </section>
            <section className={editorsWrapper}>
              <EditorCell>
                <Editor
                  value={value}
                  name={title}
                  htmlElementProps={{
                    className: editorClassName,
                  }}
                  onChange={onChange}
                  schema={source}
                  navigationBar={false}
                  mode="code"
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
            </section>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
