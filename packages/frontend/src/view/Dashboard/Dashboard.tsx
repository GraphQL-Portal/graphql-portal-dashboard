import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import { useMetrics } from '../../presenter/Metrics';
import { Header, HugeWidget, Widget, WidgetRow, Select } from '../../ui';
import {
  CountryChart,
  FailureRequestRateChart,
  RequestChart,
  chartButtons,
} from '../MetricChart';
import { useStyles } from './useStyles';
import { formatArgumentLabel, formatValueLabel } from '../../utils';
import { ToggleButtonGroup } from '@material-ui/lab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Range, RangeList } from '../../types';

export const Dashboard: React.FC = () => {
  const { widget, apiSelect } = useStyles();
  const {
    data = {},
    range,
    setRange,
    selectApiDef,
    apiDef,
    apis,
  } = useMetrics();
  const { latency = [], count = [], countries = [], failures = [] } = data;
  const handleDateRange = (
    event: React.MouseEvent<HTMLElement>,
    newDateRange: Range | null
  ) => {
    newDateRange ? setRange(newDateRange) : setRange('hour');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Header title="Dashboard" />
      <WidgetRow>
        <Widget className={widget}>
          <ToggleButtonGroup
            value={range}
            onChange={handleDateRange}
            exclusive
            size="large"
          >
            {RangeList.map((value) => (
              <ToggleButton value={value} key={value}>
                {value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Widget>
        <Widget className={widget}>
          <Select
            className={apiSelect}
            options={apis}
            value={apiDef}
            label="API"
            onChange={(e, { props }: any) => selectApiDef(props?.value)}
          />
        </Widget>
      </WidgetRow>
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <RequestChart*/}
      {/*      data={latency}*/}
      {/*      title="Average Request Latency"*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      valueLabelHandler={formatValueLabel}*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <RequestChart*/}
      {/*      data={count}*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      title="Average Request Count"*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
      {/*{countries.length > 0 && (*/}
      {/*  <WidgetRow>*/}
      {/*    <HugeWidget>*/}
      {/*      <CountryChart*/}
      {/*        data={countries}*/}
      {/*        title="Countries where requests were made from"*/}
      {/*      />*/}
      {/*    </HugeWidget>*/}
      {/*  </WidgetRow>*/}
      {/*)}*/}
      {/*<WidgetRow>*/}
      {/*  <HugeWidget>*/}
      {/*    <FailureRequestRateChart*/}
      {/*      argumentLabelHandler={formatArgumentLabel(scale)}*/}
      {/*      data={failures}*/}
      {/*      title="Failure/Success Chart"*/}
      {/*    />*/}
      {/*  </HugeWidget>*/}
      {/*</WidgetRow>*/}
    </>
  );
};
