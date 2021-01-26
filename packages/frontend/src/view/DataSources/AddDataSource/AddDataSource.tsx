import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { useStepper } from '../../../model/Hooks';
import { ROUTES } from '../../../model/providers';
import { useAddDataSource } from '../../../presenter/DataSources';
import {
  WidgetRow,
  HugeWidget,
  WidgetHeader,
  WidgetBody,
  Stepper,
  StepperBody,
} from '../../../ui';
import { ADD_SOURCE_STEPS } from '../constants';
import { SourceName } from '../SourceName';
import { FormCaption } from './FormCaption';
import { AddDataSourceHeader } from './Header';
import { useStyles } from './useStyles';
import { GraphQLHandler } from '../GraphQLHandler';

export const AddDataSource: React.FC = () => {
  const { step, nextStep } = useStepper(ADD_SOURCE_STEPS.length - 1);
  const { source } = useAddDataSource();
  const { visibleOverflow } = useStyles({});

  if (!source) return <Redirect to={ROUTES.DATA_SOURCES} />;

  const { title, description } = source;

  return (
    <>
      <Helmet>
        <title>Add new connector</title>
      </Helmet>
      <AddDataSourceHeader />
      <WidgetRow>
        <HugeWidget className={visibleOverflow}>
          <WidgetHeader title="Configure a data-source" />
          <WidgetBody>
            <FormCaption title={title} description={description} />
            <Stepper steps={ADD_SOURCE_STEPS} activeStep={step} />
            <StepperBody step={step}>
              <SourceName
                step={step}
                nextStep={nextStep}
                state={{ name: '' }}
              />
              <GraphQLHandler />
            </StepperBody>
          </WidgetBody>
        </HugeWidget>
      </WidgetRow>
    </>
  );
};
