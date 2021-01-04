import React from 'react';
import {
  Header,
  HugeWidget,
  PrimaryButton,
  WidgetRow,
} from '../../ui';
import { EmptyApiDefs } from './Empty';
import { ApiDefsList } from './List';
import { Loading } from '../Loading';
import { useMyApi } from '../../presenter/ApiDef/useMyApi';

export const MyAPI:React.FC = () => {
  const { data, loading, onDelete, onUpdate, onCreate } = useMyApi();

  if (loading) return <Loading />

  return (
    <>
      <Header title="Your APIs">
        <PrimaryButton onClick={onCreate} >Create new API</PrimaryButton>
      </Header>
      <WidgetRow>
        <HugeWidget>
          {data.length ? <ApiDefsList list={data} onDelete={onDelete} onUpdate={onUpdate} /> : <EmptyApiDefs />}
        </HugeWidget>
      </WidgetRow>
    </>
  );
}
