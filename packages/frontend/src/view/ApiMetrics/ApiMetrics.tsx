import React from 'react';
import { Helmet } from 'react-helmet';

import { useApiMetrics } from '../../presenter/Metrics';
import {
  Header,
  HugeWidget,
  Widget,
  WidgetRow,
  ButtonGroup,
  HeaderBackButton,
} from '../../ui';
import { ROUTES } from '../../model/providers';
import {
  CHART_BUTTONS,
  LatencyRequestChart,
  SuccessFailureChart,
} from '../MetricChart';
import { Loading } from '../Loading';

import { useStyles } from './useStyles';

export const ApiMetrics: React.FC = () => {
  const { widget } = useStyles();
  const { data, loading, range, onSetRange } = useApiMetrics();

  if (loading) return <Loading />;

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
