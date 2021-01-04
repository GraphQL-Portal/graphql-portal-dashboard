import React from 'react';
import {
  Header,
  HugeWidget,
  WidgetRow,
} from '../../ui';
import { EmptyUsers } from './Empty';
import { UsersList } from './List';
import { Loading } from '../Loading';
import { useUsers } from '../../presenter/Users';

export const Users:React.FC = () => {
  const { data, loading } = useUsers();

  if (loading) return <Loading />

  return (
    <>
      <Header title="Active Users"/>
      <WidgetRow>
        <HugeWidget>
          {data.length ? <UsersList list={data}/> : <EmptyUsers />}
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
