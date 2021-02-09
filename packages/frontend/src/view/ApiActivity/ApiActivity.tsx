import React from 'react';
import { Header, HugeWidget, Widget, WidgetRow } from '../../ui';
import { EmptyApiActivity } from './Empty';
import { ApiActivityList } from './List';
import { Loading } from '../Loading';
import { useApiActivity } from '../../presenter/Metrics';
import { ButtonGroup, Button } from '@material-ui/core';

export const ApiActivity: React.FC = () => {
  const { data, loading, setDateRange, onApiClick } = useApiActivity();

  return (
    <>
      <Header title="My APIs Activity" />
      <Widget>
        <ButtonGroup size="large">
          <Button onClick={() => setDateRange('day')}>Last day</Button>
          <Button onClick={() => setDateRange('week')}>Last week</Button>
          <Button onClick={() => setDateRange('month')}>Last month</Button>
          <Button onClick={() => setDateRange('year')}>Last year</Button>
        </ButtonGroup>
      </Widget>
      <WidgetRow>
        <HugeWidget>
          {
            loading ? <Loading /> : data?.length > 0 ? (<ApiActivityList
              data={data}
              onApiClick={onApiClick}
            />) : (<EmptyApiActivity />)
          }
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
