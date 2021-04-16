import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { ROUTES } from '../../../model/providers';
import {
  useAddDataSource,
  useUpdateDataSource,
} from '../../../presenter/DataSources';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  StepperBody,
  NotLinearStepper,
  PrimaryButton,
} from '../../../ui';
import { SourceName } from '../SourceName';
import { SourceHandler } from '../SourceHandler';
import { SourceTransforms } from '../SourceTransforms';
import { FormCaption } from './FormCaption';
import { AddDataSourceHeader } from './Header';
import { useStyles } from './useStyles';
import { formatHandlerTitle } from '../helpers';
import { selectors } from '../../Tour';

export const AddDataSource: React.FC<{ mode: 'add' | 'update' }> = ({
  mode,
}) => {
  const hook = mode === 'add' ? useAddDataSource : useUpdateDataSource;
  const {
    source,
    step,
    updateState,
    state,
    isDisabled,
    onSubmit,
    setStep,
    completed,
    text,
    steps,
  } = hook();
  const { visibleOverflow } = useStyles({});

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />;

  const { title, description } = source.connector;
  const { name, handler, transforms } = state;

  const stepsComponents =
    steps.length === 3
      ? [
          <SourceHandler
            updateState={updateState}
            state={{ handler }}
            source={source}
            step={1}
          />,
          <SourceTransforms
            updateState={updateState}
            state={{ transforms }}
            step={2}
          />,
        ]
      : [
          <SourceTransforms
            updateState={updateState}
            state={{ transforms }}
            step={1}
          />,
        ];

  return (
    <>
      <Helmet>
        <title>Add new data-source</title>
      </Helmet>
      <AddDataSourceHeader />
      <WidgetRow data-tour={selectors.DATA_SOURCE_ADD_WIDGET}>
        <HugeWidget className={visibleOverflow}>
          <WidgetHeader title={text.title}>
            <PrimaryButton
              data-tour={selectors.DATA_SOURCE_ADD_BUTTON}
              disabled={isDisabled}
              onClick={onSubmit}
            >
              {text.button}
            </PrimaryButton>
          </WidgetHeader>
          <WidgetBody>
            <FormCaption
              title={formatHandlerTitle(title)}
              description={description}
            />
            <NotLinearStepper
              steps={steps}
              nonLinear
              activeStep={step}
              setStep={setStep}
              completed={completed}
            />
            <StepperBody step={step}>
              <SourceName updateState={updateState} state={{ name }} step={0} />
              {stepsComponents}
            </StepperBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
