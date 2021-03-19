import React from 'react';
import { HugeWidget, Header, WidgetRow } from '../../ui';
import { EmptyApiActivity } from './Empty';
import { ApiActivityList } from './List';
import { Loading } from '../Loading';
import { useApiActivity } from '../../presenter/Metrics';
import { Helmet } from 'react-helmet';

export const ApisActivity: React.FC = () => {
  const { data, loading, onApiClick } = useApiActivity();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>APIs Activity</title>
      </Helmet>
      <Header title="APIs Activity" />
      <WidgetRow>
        <HugeWidget>
          {data?.length > 0 ? (
            <ApiActivityList data={data} onApiClick={onApiClick} />
          ) : (
            <EmptyApiActivity />
          )}
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
