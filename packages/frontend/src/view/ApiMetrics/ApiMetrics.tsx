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
  SlowestRequests,
  SourcesLatenciesChart,
} from '../MetricChart';

import { useStyles } from './useStyles';

export const ApiMetrics: React.FC = () => {
  const { widget } = useStyles();
  const { data, range, onSetRange } = useApiActivityMetrics();

  const {
    getChunkedAPIMetrics,
    getCountryMetrics,
    getSlowestRequests,
    getApiAndSourcesLatencies,
  } = data || {};

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
          <ButtonGroup
            onClick={onSetRange}
            buttons={CHART_BUTTONS}
            active={range}
          />
        </Widget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Latency and Request" />
          <LatencyRequestChart
            data={getChunkedAPIMetrics || []}
            range={range}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Average Latency per Data Source" />
          <SourcesLatenciesChart
            data={getApiAndSourcesLatencies || []}
            range={range}
          />
        </HugeWidget>
      </WidgetRow>
      <WidgetRow>
        <HugeWidget>
          <WidgetHeader title="Success and Failure" />
          <SuccessFailureChart
            data={getChunkedAPIMetrics || []}
            range={range}
          />
        </HugeWidget>
      </WidgetRow>
      {getCountryMetrics?.length > 0 && (
        <WidgetRow>
          <HugeWidget>
            <WidgetHeader title="Countries" />
            <CountryChart data={getCountryMetrics} />
          </HugeWidget>
        </WidgetRow>
      )}
      {getSlowestRequests?.length > 0 && (
        <WidgetRow>
          <HugeWidget>
            <WidgetHeader title="Slowest requests"></WidgetHeader>
            <SlowestRequests data={getSlowestRequests} />
          </HugeWidget>
        </WidgetRow>
      )}
    </>
  );
};
