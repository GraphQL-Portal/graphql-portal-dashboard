import React from 'react';
import { HugeWidget } from '../../ui';
import { EmptyApiActivity } from './Empty';
import { ApiActivityList } from './List';
import { Loading } from '../Loading';
import { useApiActivity } from '../../presenter/Metrics';
import { ButtonGroup, Button } from '@material-ui/core';

export const ApiActivity: React.FC = () => {
  const { data, loading, setDateRange, onApiClick } = useApiActivity();

  return (
    <>
      <HugeWidget>
        <ButtonGroup size="large">
          <Button onClick={() => setDateRange('day')}>Last day</Button>
          <Button onClick={() => setDateRange('week')}>Last week</Button>
          <Button onClick={() => setDateRange('month')}>Last month</Button>
          <Button onClick={() => setDateRange('year')}>Last year</Button>
        </ButtonGroup>
        {loading ? (
          <Loading />
        ) : data?.length > 0 ? (
          <ApiActivityList data={data} onApiClick={onApiClick} />
        ) : (
          <EmptyApiActivity />
        )}
      </HugeWidget>
    </>
  );
};
