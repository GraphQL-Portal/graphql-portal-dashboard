import { Button, ButtonGroup } from '@material-ui/core';
import React, { ReactText, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMetrics } from '../../presenter/Metrics';
import { Header, HugeWidget, Widget, WidgetRow, DatePicker } from '../../ui';
import { useStyles } from './useStyles';
import { MetricChart } from './MetricChart';
import moment from 'moment';

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

  const [startDate, handleStartDate] = useState(moment().add(-31, 'day'));
  const [endDate, handleEndDate] = useState(moment());
  const [scale, setScale] = useState('day' as Scale);

  const { data, refetch } = useMetrics(startDate.toDate(), endDate.toDate(), 'day');
  const latencyData =
    (data && data.getMetrics.latency.map((r: any) => ({ ...r, argument: new Date(r.argument).toISOString() }))) || [];
  const countData =
    (data && data.getMetrics.count.map((r: any) => ({ ...r, argument: new Date(r.argument).toISOString() }))) || [];

  const handleButton = (s: Scale) => () => {
    setScale(s);
    if (s === 'hour') refetch(startDate.toDate(), startDate.clone().add(1, 'day').toDate(), s);
    else refetch(startDate.toDate(), endDate.toDate(), s as any);
  };

  return (
    <>
      <Helmet>
        <title>Metrics And Logs</title>
      </Helmet>
      <Header title="Metrics And Logs" />
      <WidgetRow>
        <Widget className={buttons}>
          <ButtonGroup size="large">
            <Button onClick={handleButton('hour')}>Hour</Button>
            <Button onClick={handleButton('day')}>Day</Button>
            <Button onClick={handleButton('week')}>Week</Button>
            <Button onClick={handleButton('month')}>Month</Button>
          </ButtonGroup>
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="Start Date"
            defaultValue={startDate.format('Y-MM-DD')}
            onChange={(e) => handleStartDate(moment(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="End Date"
            defaultValue={endDate.format('Y-MM-DD')}
            onChange={(e) => handleEndDate(moment(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <MetricChart
            data={latencyData}
            title="Average Request Latency"
            argumentLabelHandler={formatArgumentLabel(scale)}
            valueLabelHandler={formatValueLabel}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <MetricChart
            data={countData}
            argumentLabelHandler={formatArgumentLabel(scale)}
            title="Average Request Count"
          />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
