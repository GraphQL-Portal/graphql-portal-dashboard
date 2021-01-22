import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import { WidgetRow, HugeWidget, WidgetHeader, WidgetBody, H6, Input, PrimaryButton } from '../../../ui';
import { EditorWrapper } from './EditorWrapper';
import { EditorCell } from './EditorCell';
import { FormCaption } from './FormCaption';
import { AddDataSourceHeader } from './Header';
import { useStyles } from './useStyles';

export const AddDataSource: React.FC = () => {
  const { source, control, onSubmit, errors } = useAddDataSource();
  const { visibleOverflow, editor, code, schema, editorHeader, editorErrorHeader } = useStyles({});

  const editorClassName = clsx(editor, code);
  const schemaClassName = clsx(editor, schema);
  const editorConnectorHeader = clsx(editor, !!(errors && errors.handler) && editorErrorHeader);

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />;

  const { title, description } = source;

  return (
    <>
      <Helmet>
        <title>Add new connector</title>
      </Helmet>
      <AddDataSourceHeader />
      <WidgetRow>
        <HugeWidget className={visibleOverflow}>
          <WidgetHeader title="Configure a data-source" />
          <WidgetBody>
            <FormCaption title={title} description={description} />
            <form onSubmit={onSubmit}>
              <EditorWrapper gapBottom={4}>
                <EditorCell>
                  <Controller
                    as={Input}
                    name="name"
                    label="Data-source name"
                    control={control}
                    fullWidth
                    error={!!(errors && errors.name)}
                  />
                </EditorCell>
                <EditorCell />
              </EditorWrapper>
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
              <PrimaryButton type="submit">Save</PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
