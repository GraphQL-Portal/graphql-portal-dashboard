import { Button, ButtonGroup } from '@material-ui/core';
import moment from 'moment';
import React, { ReactText, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMetrics } from '../../presenter/Metrics';
import { DatePicker, Header, HugeWidget, Widget, WidgetRow } from '../../ui';
import { CountryChart, MetricChart } from './MetricChart';
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

  const [startDate, setStartDate] = useState(moment().add(-25, 'day'));
  const [endDate, setEndDate] = useState(moment());
  const [scale, setScale] = useState('day' as Scale);

  const { data, refetch } = useMetrics(startDate.toDate(), endDate.toDate(), scale);
  const latencyData = data && data.getMetrics.latency || [];
  const countData = data && data.getMetrics.count || [];
  const countriesData = data && data.getMetrics.countries || [];

  const handleButton = (s: Scale) => () => setScale(s);

  useEffect(() => {
    const sDate = moment(startDate);
    let data = { startDate: startDate.toDate().getTime(), endDate: endDate.toDate().getTime(), scale };
    if (scale === 'hour') {
      data = {
        startDate: sDate.toDate().getTime(),
        endDate: sDate.clone().add(1, 'day').toDate().getTime(),
        scale,
      };
    }
    refetch(data);
  }, [startDate, endDate, scale]);

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
            value={startDate}
            disableFuture
            maxDate={endDate}
            onChange={(e) => setStartDate(moment(e?.toDate()))}
          />
        </Widget>
        <Widget className={date}>
          <DatePicker
            label="End Date"
            value={endDate}
            disableFuture
            onChange={(e) => setEndDate(moment(e?.toDate()))}
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
      <WidgetRow>
        <HugeWidget>
          <CountryChart data={countriesData} title="Countries where requests were made from" />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
