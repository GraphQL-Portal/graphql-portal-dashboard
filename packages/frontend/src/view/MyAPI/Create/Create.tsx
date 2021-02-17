import React from 'react';
import { Helmet } from 'react-helmet';

import { useCreateApi } from '../../../presenter/ApiDefs';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  PrimaryButton,
} from '../../../ui';
import { GeneralForm, DataSourcesForm } from '../Form';
import { AddNewAPIHeader } from './Header';

const PAGE_TITLE = 'Create a new API';

export const CreateApi: React.FC = () => {
  const {
    connected,
    control,
    errors,
    onSubmit,
    options,
    tokenFields,
    addToken,
    removeToken,
    onAddSource,
    onRemoveSource,
  } = useCreateApi();

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <AddNewAPIHeader />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={PAGE_TITLE} />
          <WidgetBody>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <GeneralForm
                control={control}
                errors={errors}
                tokenFields={tokenFields}
                addToken={addToken}
                removeToken={removeToken}
              />
              <DataSourcesForm
                control={control}
                options={options}
                connected={connected}
                onAddSource={onAddSource}
                onRemoveSource={onRemoveSource}
              />
              <PrimaryButton type="submit">Create new API</PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
