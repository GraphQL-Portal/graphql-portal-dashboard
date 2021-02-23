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
  ButtonGroup,
} from '../../ui';
import {
  CountryChart,
  FailureRequestRateChart,
  RequestChart,
  chartButtons,
} from '../MetricChart';
import { useStyles } from './useStyles';
import { formatArgumentLabel, formatValueLabel } from '../../utils';

export const Dashboard: React.FC = () => {
  const { widget, apiSelect } = useStyles();
  const {
    data = {},
    startDate,
    endDate,
    scale,
    setStartDate,
    setEndDate,
    setScale,
    selectApiDef,
    apis,
  } = useMetrics();
  const { latency = [], count = [], countries = [], failures = [] } = data;

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <WidgetRow>
        <Widget className={widget}>
          <ButtonGroup onClick={setScale} buttons={chartButtons} />
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
      {countries.length > 0 && (
        <WidgetRow>
          <HugeWidget>
            <CountryChart
              data={countries}
              title="Countries where requests were made from"
            />
          </HugeWidget>
        </WidgetRow>
      )}
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
