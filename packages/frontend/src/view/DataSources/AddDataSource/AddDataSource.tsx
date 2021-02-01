import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  Stepper,
  StepperBody,
  PrimaryButton,
} from '../../../ui';
import { ADD_SOURCE_STEPS } from '../constants';
import { SourceName } from '../SourceName';
import { SourceHandler } from '../SourceHandler';
import { SourceTransforms } from '../SourceTransforms';
import { FormCaption } from './FormCaption';
import { AddDataSourceHeader } from './Header';
import { useStyles } from './useStyles';

export const AddDataSource: React.FC = () => {
  const {
    source,
    step,
    updateState,
    state,
    isDisabled,
    onAddSource,
  } = useAddDataSource(ADD_SOURCE_STEPS.length - 1);
  const { visibleOverflow } = useStyles({});

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />;

  const { title, description } = source;
  const { name, handler, transforms } = state;

  return (
    <>
      <Helmet>
        <title>Add new data-source</title>
      </Helmet>
      <AddDataSourceHeader />
      <WidgetRow>
        <HugeWidget className={visibleOverflow}>
          <WidgetHeader title="Configure a data-source">
            <PrimaryButton disabled={isDisabled} onClick={onAddSource}>
              Add data-source
            </PrimaryButton>
          </WidgetHeader>
          <WidgetBody>
            <FormCaption title={title} description={description} />
            <Stepper steps={ADD_SOURCE_STEPS} activeStep={step} />
            <StepperBody step={step}>
              <SourceName updateState={updateState} state={{ name }} />
              <SourceHandler
                updateState={updateState}
                state={{ handler }}
                source={source}
              />
              <SourceTransforms
                updateState={updateState}
                state={{ transforms }}
              />
            </StepperBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
