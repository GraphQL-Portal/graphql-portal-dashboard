import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiMetrics } from '../../presenter/Metrics';
import {
  DatePicker,
  Header,
  HugeWidget,
  Widget,
  WidgetRow,
  ButtonGroup,
  HeaderBackButton,
} from '../../ui';
import {
  CountryChart,
  FailureRequestRateChart,
  RequestChart,
  CHART_BUTTONS,
} from '../MetricChart';
import { formatArgumentLabel, formatValueLabel } from '../../utils';
import { useStyles } from './useStyles';
import { ROUTES } from '../../model/providers';

export const ApiMetrics: React.FC = () => {
  const { date, buttons } = useStyles();

  const {
    data = {},
    startDate,
    endDate,
    scale,
    setStartDate,
    setEndDate,
    setScale,
  } = useApiMetrics();
  const { latency = [], count = [], countries = [], failures = [] } = data;
  console.log(data);

  return (
    <>
      <Helmet>
        <title>API Metrics</title>
      </Helmet>
      <Header
        startChildren={
          <HeaderBackButton
            to={ROUTES.APIS_ACTIVITY}
            title="Back to APIs Activity"
          />
        }
        title=""
      />
      <WidgetRow>
        <Widget className={buttons}>
          <ButtonGroup onClick={setScale} buttons={CHART_BUTTONS} />
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
            data={latency}
            title="Average Request Latency"
            argumentLabelHandler={formatArgumentLabel(scale)}
            valueLabelHandler={formatValueLabel}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <RequestChart
            data={count}
            argumentLabelHandler={formatArgumentLabel(scale)}
            title="Average Request Count"
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <CountryChart
            data={countries}
            title="Countries where requests were made from"
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <FailureRequestRateChart
            argumentLabelHandler={formatArgumentLabel(scale)}
            data={failures}
            title="Failure/Success Chart"
          />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
