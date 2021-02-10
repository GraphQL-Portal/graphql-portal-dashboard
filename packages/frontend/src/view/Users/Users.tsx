import React from 'react';
import { Header, HugeWidget, WidgetRow, PrimaryButton } from '../../ui';
import { EmptyUsers } from './Empty';
import { UsersList } from './List';
import { Loading } from '../Loading';
import { useUsers } from '../../presenter/Users';
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';
import { CreateUser } from './CreateUser';

export const Users: React.FC = () => {
  const {
    list,
    loading,
    onBlock,
    onUnblock,
    onDelete,
    onEdit,
    onCreate,
  } = useUsers();

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Active Users">
        <PrimaryButton onClick={onCreate}>Create User</PrimaryButton>
      </Header>
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
        <DeleteUser />
        <UpdateUser />
        <CreateUser />
      </WidgetRow>
      <DeleteUser />
      <UpdateUser />
    </>
  );
};
