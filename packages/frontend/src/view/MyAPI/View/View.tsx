import React from 'react';
import { Helmet } from 'react-helmet';
import { ROUTES } from '../../../model/providers';

import {
  Header,
  HeaderBackButton,
  HugeWidget,
  TabsBody,
  TabsHead,
  WidgetBody,
  WidgetHeader,
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

export const ViewAPI: React.FC = () => {
  const {
    tab,
    onChange,
    fetcher,
    data: { name, enabled },
    loading,
  } = useViewAPI();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`View ${name} API`}</title>
      </Helmet>
      <Header
        startChildren={
          <HeaderBackButton to={ROUTES.APIS} title="Back to My API" />
        }
        title=""
      />
      <WidgetRow>
        <HugeWidget>
          {enabled ? (
            <>
              <WidgetHeader title={`View ${name} API`} />
              <WidgetBody>
                <TabsHead
                  value={tab}
                  onChange={onChange}
                  tabsList={VIEW_TABS}
                />
                <TabsBody value={tab}>
                  <Playground fetcher={fetcher} name={name} />
                  <Schema fetcher={fetcher} />
                </TabsBody>
              </WidgetBody>
            </>
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
