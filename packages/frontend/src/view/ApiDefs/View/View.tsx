import React from 'react';
import { Helmet } from 'react-helmet';

import { HugeWidget, WidgetRow } from '../../../ui';
import { useViewAPI } from '../../../presenter/ApiDefs';
import { Loading } from '../../Loading';
import { ViewHeader } from './ViewHeader';
import { selectors } from '../../Tour';
import {
  DeclinedAPI as DeclinedAPIProps,
  InitializedAPI as InitializedAPIProps,
  ReadyAPI as ReadyAPIProps,
} from '../../../types';
import { InitializedAPI } from './InitializedAPI';
import { DeclinedAPI } from './DeclinedAPI';
import { ReadyAPI } from './ReadyAPI';
import { DisabledAPI } from './DisabledAPI';
import { ApiDefStatus } from '@graphql-portal/types';

export const ViewAPI: React.FC = () => {
  const {
    tab,
    onChange,
    fetcher,
    name,
    enabled,
    status,
    loading,
    apiEndpoint,
    refetch,
  } = useViewAPI();

  if (loading) return <Loading />;

  let ApiComponent:
    | React.FC<DeclinedAPIProps>
    | React.FC<InitializedAPIProps>
    | React.FC<ReadyAPIProps>;

  switch (status) {
    case ApiDefStatus.INITIALIZED:
      ApiComponent = InitializedAPI;
      break;
    case ApiDefStatus.DECLINED:
      ApiComponent = DeclinedAPI;
      break;
    default:
      ApiComponent = ReadyAPI;
      break;
  }

  return (
    <>
      <Helmet>
        <title>{`View ${name} API`}</title>
      </Helmet>
      <ViewHeader name={name} apiEndpoint={apiEndpoint} />
      <WidgetRow data-tour={selectors.MY_APIS_EXAMPLE_API}>
        <HugeWidget>
          {enabled ? (
            <ApiComponent
              tab={tab}
              onChange={onChange}
              name={name}
              fetcher={fetcher}
              refetch={refetch}
            />
          ) : (
            <DisabledAPI name={name} />
          )}
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
