import React from 'react';
import { Helmet } from 'react-helmet';

import {
  HugeWidget,
  TabsBody,
  TabsHead,
  WidgetBody,
  WidgetRow,
  Emoji,
  EmptyIcon,
  EmptyText,
  EmptyContainer,
} from '../../../ui';
import { useViewAPI } from '../../../presenter/ApiDefs';
import { Loading } from '../../Loading';
import { VIEW_TABS } from '../constants';
import { Playground } from './Playground';
import { Schema } from './Schema';
import { ViewHeader } from './ViewHeader';
import { selectors } from '../../Tour';

export const ViewAPI: React.FC = () => {
  const {
    tab,
    onChange,
    fetcher,
    name,
    enabled,
    loading,
    apiEndpoint,
  } = useViewAPI();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`View ${name} API`}</title>
      </Helmet>
      <ViewHeader name={name} apiEndpoint={apiEndpoint} />
      <WidgetRow data-tour={selectors.MY_APIS_EXAMPLE_API}>
        <HugeWidget>
          {enabled ? (
            <WidgetBody>
              <TabsHead value={tab} onChange={onChange} tabsList={VIEW_TABS} />
              <TabsBody value={tab}>
                <Playground fetcher={fetcher} name={name} />
                <Schema fetcher={fetcher} />
              </TabsBody>
            </WidgetBody>
          ) : (
            <EmptyContainer>
              <EmptyIcon />
              <EmptyText>
                API {name} is disabled <Emoji label="dizzy face"> 😵</Emoji>
              </EmptyText>
            </EmptyContainer>
          )}
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
