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
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';

export const Users: React.FC = () => {
  const { list, data, loading, onBlock, onUnblock, onDelete, onEdit } = useUsers();

  if (loading) return <Loading />

  return (
    <>
      <Header title="Active Users" />
      <WidgetRow>
        <HugeWidget>
          {data.length ? <UsersList
            list={list}
            data={data}
            onBlock={onBlock}
            onUnblock={onUnblock}
            onDelete={onDelete}
            onEdit={onEdit}
          /> : <EmptyUsers />}
        </HugeWidget>
        <DeleteUser />
        <UpdateUser />
      </WidgetRow>
    </>
  );
}
