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
import { useApiDefs } from '../../presenter/ApiDefs';
import { QUERY_API_DEFS, DELETE_API_DEF } from '../../model/ApiDefs/queries';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

export const MyAPI:React.FC = () => {
  const { data, loading } = useApiDefs();
  const history = useHistory();

  const [deleteApiDef] = useMutation(DELETE_API_DEF, { refetchQueries: [{ query: QUERY_API_DEFS }]});
  const onDelete = async (id: number) => await deleteApiDef({ variables: { id }});

  const onUpdate = async (id: number) => history.push(`/my-apis/${id}`);

  const onCreate = async () => history.push('/my-apis/new');

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
