import React from 'react';
import { Helmet } from 'react-helmet';

import { Header, HugeWidget, PrimaryButton, WidgetRow } from '../../../ui';
import { useMyApi } from '../../../presenter/ApiDefs';
import { Loading } from '../../Loading';
import { DeleteAPI } from '../DeleteAPI';
import { EmptyApiDefs } from './Empty';
import { ApiDefsList } from './List';

export const MyAPI: React.FC = () => {
  const {
    data,
    loading,
    onDelete,
    onUpdate,
    onCreate,
    onView,
    refetch,
  } = useMyApi();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>My APIs</title>
      </Helmet>
      <Header title="Your APIs">
        <PrimaryButton onClick={onCreate}>Create new API</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          {data.length ? (
            <ApiDefsList
              list={data}
              refetch={refetch!}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onView={onView}
            />
          ) : (
            <EmptyApiDefs />
          )}
        </HugeWidget>
      </WidgetRow>
      <DeleteAPI />
    </>
  );
};
