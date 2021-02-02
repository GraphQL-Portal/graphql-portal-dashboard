import React from 'react';
import {
  Header,
  HugeWidget,
  PrimaryButton,
  WidgetRow,
} from '../../ui';
import { EmptyUsers } from './Empty';
import { UsersList } from './List';
import { Loading } from '../Loading';
import { useUsers } from '../../presenter/Users';
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';
import { CreateUser } from './CreateUser';

export const Users: React.FC = () => {
  const { list, data, loading, onBlock, onUnblock, onDelete, onEdit, onCreate } = useUsers();

  if (loading) return <Loading />

  return (
    <>
      <Header title="Active Users">
        <PrimaryButton onClick={onCreate}>Create user</PrimaryButton>
      </Header>
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
        <CreateUser />
      </WidgetRow>
    </>
  );
}
