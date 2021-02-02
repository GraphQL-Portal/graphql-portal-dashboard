import React from 'react';
import { Header, HugeWidget, WidgetRow } from '../../ui';
import { EmptyUsers } from './Empty';
import { UsersList } from './List';
import { Loading } from '../Loading';
import { useUsers } from '../../presenter/Users';
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';

export const Users: React.FC = () => {
  const { list, loading, onBlock, onUnblock, onDelete, onEdit } = useUsers();

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Active Users" />
      <WidgetRow>
        <HugeWidget>
          {list.length > 0 ? (
            <UsersList
              list={list}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ) : (
            <EmptyUsers />
          )}
        </HugeWidget>
      </WidgetRow>
      <DeleteUser />
      <UpdateUser />
    </>
  );
};
