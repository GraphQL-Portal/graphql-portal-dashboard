import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Controller } from 'react-hook-form';

import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  Input,
  PrimaryButton,
} from '../../../ui';
import { EditorWrapper, EditorCell, Editors } from './Editors';
import { FormCaption } from './FormCaption';
import { AddDataSourceHeader } from './Header';
import { useStyles } from './useStyles';

export const AddDataSource: React.FC = () => {
  const { source, control, onSubmit, errors } = useAddDataSource();
  const { visibleOverflow } = useStyles({});

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
              <Editors
                control={control}
                source={source}
                title={title}
                errors={errors}
              />

              <PrimaryButton type="submit">Save</PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
