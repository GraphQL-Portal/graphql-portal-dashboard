import React from 'react';
import { Helmet } from 'react-helmet';

import { useCreateApi } from '../../../presenter/ApiDefs';
import {
  Header,
  HeaderBackButton,
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  PrimaryButton,
} from '../../../ui';
import { ROUTES } from '../../../model/providers';
import {
  AuthenticationForm,
  GeneralForm,
  DataSourcesForm,
  SchemaForm,
  IPForm,
  LimitsForm,
  WebhooksForm,
} from '../Form';
import { selectors } from '../../Tour';

const PAGE_TITLE = 'Create a new API';

export const CreateApi: React.FC = () => {
  const {
    connected,
    control,
    errors,
    onSubmit,
    loading,
    options,
    tokenFields,
    addToken,
    removeToken,
    onAddSource,
    onRemoveSource,
    register,
    allowedIP,
    addAllowedIP,
    removeAllowedIP,
    deniedIP,
    addDeniedIP,
    removeDeniedIP,
    enableIPFiltering,
    disableSelectDatasources,
    hooks,
    addHook,
    removeHook,
  } = useCreateApi();

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <Header
        startChildren={
          <HeaderBackButton to={ROUTES.APIS} title="Back to My API" />
        }
        title=""
      />
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title={PAGE_TITLE} />
          <WidgetBody data-tour={selectors.MY_APIS_CREATE_FORM}>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
              <GeneralForm
                register={register}
                control={control}
                errors={errors}
              />
              <DataSourcesForm
                disableSelect={disableSelectDatasources}
                control={control}
                options={options}
                connected={connected}
                onAddSource={onAddSource}
                onRemoveSource={onRemoveSource}
              />
              <AuthenticationForm
                register={register}
                errors={errors}
                tokenFields={tokenFields}
                addToken={addToken}
                removeToken={removeToken}
              />
              <SchemaForm
                control={control}
                errors={errors}
                register={register}
              />
              <IPForm
                register={register}
                control={control}
                errors={errors}
                enableIPFiltering={enableIPFiltering}
                allowedIP={allowedIP}
                addAllowedIP={addAllowedIP}
                removeAllowedIP={removeAllowedIP}
                deniedIP={deniedIP}
                addDeniedIP={addDeniedIP}
                removeDeniedIP={removeDeniedIP}
              />
              <LimitsForm register={register} errors={errors} />
              <WebhooksForm
                register={register}
                control={control}
                errors={errors}
                hooks={hooks}
                addHook={addHook}
                removeHook={removeHook}
              />
              <PrimaryButton
                data-tour={selectors.MY_APIS_CREATE_FORM_CREATE_NEW_BUTTON}
                type="submit"
                loading={loading}
              >
                Create new API
              </PrimaryButton>
            </form>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
