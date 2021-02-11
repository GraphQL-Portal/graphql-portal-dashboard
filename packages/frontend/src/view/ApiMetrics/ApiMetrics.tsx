import { Button, ButtonGroup } from '@material-ui/core';
import React, { ReactText } from 'react';
import { Helmet } from 'react-helmet';
import { useApiMetrics } from '../../presenter/Metrics';
import {
  DatePicker,
  Header,
  HugeWidget,
  PrimaryButton,
  Widget,
  WidgetRow,
} from '../../ui';
import {
  CountryChart,
  FailureRequestRateChart,
  RequestChart,
} from './MetricChart';
import format from 'date-fns/format';
import { useStyles } from './useStyles';

type Scale = 'hour' | 'day' | 'week' | 'month';
const formatValueLabel = (ms: ReactText) => `${ms}ms`;

const formatArgumentLabel = (scale: Scale) => (date: ReactText) =>
  format(new Date(date), scale === 'hour' ? 'HH:mm' : 'MMM d');

export const ApiMetrics: React.FC = () => {
  const { date, buttons } = useStyles();

  const {
    data,
    startDate,
    endDate,
    scale,
    setStartDate,
    setEndDate,
    setScale,
    goBack,
  } = useApiMetrics();
  const latencyData = data?.latency || [];
  const countData = data?.count || [];
  const countriesData = data?.countries || [];
  const failuresData = data?.failures || [];

  return (
    <>
      <Helmet>
        <title>API Metrics</title>
      </Helmet>
      <Header title="API Metrics" />
      <Header title="Your API Metric">
        <PrimaryButton onClick={goBack}>Go Back</PrimaryButton>
      </Header>
      <WidgetRow>
        <Widget className={buttons}>
          <ButtonGroup size="large">
            <Button onClick={() => setScale('hour')}>Hour</Button>
            <Button onClick={() => setScale('day')}>Day</Button>
            <Button onClick={() => setScale('week')}>Week</Button>
            <Button onClick={() => setScale('month')}>Month</Button>
          </ButtonGroup>
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="Start Date"
            value={startDate}
            disableFuture
            maxDate={endDate}
            onChange={(e) => e && setStartDate(e)}
          />
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="End Date"
            value={endDate}
            disableFuture
            minDate={startDate}
            onChange={(e) => e && setEndDate(e)}
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
