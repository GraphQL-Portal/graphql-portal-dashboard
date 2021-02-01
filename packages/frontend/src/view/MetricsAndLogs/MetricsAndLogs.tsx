import { Button, ButtonGroup } from '@material-ui/core';
import moment from 'moment';
import React, { ReactText } from 'react';
import { Helmet } from 'react-helmet';
import { useMetrics } from '../../presenter/Metrics';
import { DatePicker, Header, HugeWidget, Widget, WidgetRow } from '../../ui';
import { CountryChart, FailureRequestRateChart, RequestChart } from './MetricChart';
import { useStyles } from './useStyles';

type Scale = 'hour' | 'day' | 'week' | 'month';
const formatValueLabel = (ms: ReactText) => `${ms}ms`;

const formatArgumentLabel = (scale: Scale) => (date: ReactText) => {
  const d = moment(date);
  if (scale === 'hour') {
    return d.format('HH:mm');
  } else {
    return d.format('MMM D');
  }
};

export const MetricsAndLogs:React.FC = () => {
  const { date, buttons } = useStyles();

  const { data, startDate, endDate, scale, setStartDate, setEndDate, setScale } = useMetrics();
  const latencyData = data?.latency || [];
  const countData = data?.count || [];
  const countriesData = data?.countries || [];
  const failuresData = data?.failures || [];

  const createButtonHandler = (s: Scale) => () => setScale(s);

  return (
    <>
      <Helmet>
        <title>Metrics And Logs</title>
      </Helmet>
      <Header title="Metrics And Logs" />
      <WidgetRow>
        <Widget className={buttons}>
          <ButtonGroup size="large">
            <Button onClick={createButtonHandler('hour')}>Hour</Button>
            <Button onClick={createButtonHandler('day')}>Day</Button>
            <Button onClick={createButtonHandler('week')}>Week</Button>
            <Button onClick={createButtonHandler('month')}>Month</Button>
          </ButtonGroup>
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="Start Date"
            value={startDate}
            disableFuture
            maxDate={endDate}
            onChange={(e) => e && setStartDate(e.toDate())}
          />
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="End Date"
            value={endDate}
            disableFuture
            minDate={startDate}
            onChange={(e) => e && setEndDate(e.toDate())}
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
          <CountryChart data={countriesData} title="Countries where requests were made from" />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <FailureRequestRateChart argumentLabelHandler={formatArgumentLabel(scale)} data={failuresData} title="Failure\Success Chart" />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
