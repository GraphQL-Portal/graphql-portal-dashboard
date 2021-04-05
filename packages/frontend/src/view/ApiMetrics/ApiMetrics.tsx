import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiActivityMetrics } from '../../presenter/Metrics';
import {
  Header,
  HugeWidget,
  Widget,
  WidgetRow,
  ButtonGroup,
  HeaderBackButton,
  WidgetHeader,
} from '../../ui';
import { ROUTES } from '../../model/providers';
import {
  CHART_BUTTONS,
  LatencyRequestChart,
  SuccessFailureChart,
  CountryChart,
} from '../MetricChart';

import { useStyles } from './useStyles';

export const ApiMetrics: React.FC = () => {
  const { widget } = useStyles();
  const { data, range, onSetRange } = useApiActivityMetrics();

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
        <Widget className={widget}>
          <ButtonGroup onClick={onSetRange} buttons={CHART_BUTTONS} />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Latency and Request" />
          <LatencyRequestChart
            data={data?.getChunkedAPIMetrics || []}
            range={range}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Success and Failure" />
          <SuccessFailureChart
            data={data?.getChunkedAPIMetrics || []}
            range={range}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Countries" />
          <CountryChart data={data?.getCountryMetrics || []} />
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
