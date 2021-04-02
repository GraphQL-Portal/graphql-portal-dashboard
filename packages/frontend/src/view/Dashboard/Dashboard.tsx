import React from 'react';
import { Helmet } from 'react-helmet';

import { useMetrics } from '../../presenter/Metrics';
import {
  Header,
  HugeWidget,
  WidgetRow,
  Select,
  ButtonGroup,
  Widget,
} from '../../ui';
import { Loading } from '../Loading';
import {
  CHART_BUTTONS,
  LatencyRequestChart,
  SuccessFailureChart,
} from '../MetricChart';
import { useStyles } from './useStyles';

export const Dashboard: React.FC = () => {
  const { widget, apiSelect, apiSelectLabel } = useStyles();
  const {
    data = {},
    range,
    onSetRange,
    apiDef,
    apis,
    onSelectChange,
    loading,
  } = useMetrics();

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <WidgetRow>
        <Widget className={widget}>
          <ButtonGroup onClick={onSetRange} buttons={CHART_BUTTONS} />
        </Widget>
        <Widget className={widget}>
          <Select
            labelClassName={apiSelectLabel}
            className={apiSelect}
            options={apis}
            value={apiDef}
            label="Filter by API"
            onChange={onSelectChange}
            fullWidth
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <LatencyRequestChart data={data} range={range} />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <SuccessFailureChart data={data} range={range} />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
