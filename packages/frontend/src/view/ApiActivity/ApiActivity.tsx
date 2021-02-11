import React from 'react';
import { HugeWidget, ButtonGroup } from '../../ui';
import { EmptyApiActivity } from './Empty';
import { ApiActivityList } from './List';
import { Loading } from '../Loading';
import { useApiActivity } from '../../presenter/Metrics';

const buttons = [
  {
    text: 'Last day',
    value: 'day',
  },
  {
    text: 'Last week',
    value: 'week',
  },
  {
    text: 'Last month',
    value: 'month',
  },
  {
    text: 'Last year',
    value: 'year',
  },
];

export const ApiActivity: React.FC = () => {
  const { data, loading, setDateRange, onApiClick } = useApiActivity();

  if (loading) return <Loading />;

  return (
    <HugeWidget>
      <ButtonGroup buttons={buttons} onClick={setDateRange} />
      {data?.length > 0 ? (
        <ApiActivityList data={data} onApiClick={onApiClick} />
      ) : (
        <EmptyApiActivity />
      )}
    </HugeWidget>
  );
};
