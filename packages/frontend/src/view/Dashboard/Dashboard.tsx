import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';

import { useMetrics } from '../../presenter/Metrics';
import {
  DatePicker,
  Header,
  HugeWidget,
  Widget,
  WidgetRow,
  Select,
} from '../../ui';
import {
  CountryChart,
  FailureRequestRateChart,
  RequestChart,
} from '../MetricChart';
import { useStyles } from './useStyles';
import { formatArgumentLabel, formatValueLabel } from '../../utils';
import { Scale } from '../../types';

export const Dashboard: React.FC = () => {
  const { widget, apiSelect } = useStyles();

  const {
    data,
    startDate,
    endDate,
    scale,
    setStartDate,
    setEndDate,
    setScale,
    selectApiDef,
    apis,
  } = useMetrics();
  const latencyData = data?.latency || [];
  const countData = data?.count || [];
  const countriesData = data?.countries || [];
  const failuresData = data?.failures || [];

  const createButtonHandler = (s: Scale) => () => setScale(s);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <WidgetRow>
        <Widget className={widget}>
          <ButtonGroup size="large">
            <Button onClick={createButtonHandler('hour')}>Hour</Button>
            <Button onClick={createButtonHandler('day')}>Day</Button>
            <Button onClick={createButtonHandler('week')}>Week</Button>
            <Button onClick={createButtonHandler('month')}>Month</Button>
          </ButtonGroup>
        </Widget>
        <Widget className={widget}>
          <DatePicker
            label="Start Date"
            value={startDate}
            disableFuture
            maxDate={endDate}
            onChange={(e) => e && setStartDate(e)}
          />
        </Widget>
        <Widget className={widget}>
          <DatePicker
            label="End Date"
            value={endDate}
            disableFuture
            minDate={startDate}
            onChange={(e) => e && setEndDate(e)}
          />
        </Widget>
        <Widget className={widget}>
          <Select
            className={apiSelect}
            options={apis}
            label="API"
            onChange={(e, { props }: any) => selectApiDef(props?.value)}
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <RequestChart
            data={latencyData}
            title="Average Request Latency"
            argumentLabelHandler={formatArgumentLabel(scale)}
            valueLabelHandler={formatValueLabel}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <RequestChart
            data={countData}
            argumentLabelHandler={formatArgumentLabel(scale)}
            title="Average Request Count"
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <CountryChart
            data={countriesData}
            title="Countries where requests were made from"
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <FailureRequestRateChart
            argumentLabelHandler={formatArgumentLabel(scale)}
            data={failuresData}
            title="Failure\Success Chart"
          />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
