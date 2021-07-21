import React, { useState } from 'react';
import ReactTour from 'reactour';
import { getSteps } from './constants';
import { useTourContext } from '../../model/providers';
import { useStyles } from './useStyles';
import { useTheme } from '@material-ui/core';
import { StartTour } from './StartTour';
import { getDataTourSelector, getDomNode, stopPropagation } from './helpers';
import { EmptyElement } from './EmptyElement';
import { NextButton } from './NextButton';
import {
  AddOnceListenerToNode,
  GoToNextStep,
  WaitUntilNextStepElementAppears,
} from '../../types';

let interval: NodeJS.Timeout;

export const Tour: React.FC = () => {
  const theme = useTheme();
  const { tour, setTourField, endTour } = useTourContext();
  const [currentStep, setCurrentStep] = useState(0);
  const { tourWrapper } = useStyles();

  const addOnceListenerToNode: AddOnceListenerToNode = (domNode, func) => {
    function listener(e: any) {
      func(domNode, e);
      domNode?.removeEventListener('click', listener);
    }
    domNode?.addEventListener('click', listener);
  };

  const waitUntilNextStepElementAppears: WaitUntilNextStepElementAppears = (
    selector,
    callback
  ) => {
    if (!selector) return callback();
    if (getDomNode(getDataTourSelector(selector))) {
      return setTimeout(() => callback(), 500);
    }
    if (interval) clearInterval(interval);
    interval = setTimeout(
      () => waitUntilNextStepElementAppears(selector, callback),
      500
    );
  };

  const goToNextStep: GoToNextStep = (selector) => {
    document
      .querySelector(steps[currentStep].selector!)
      ?.removeEventListener('click', stopPropagation);

    waitUntilNextStepElementAppears(selector, () => {
      setCurrentStep(currentStep + 1);
    });
  };

  const steps = getSteps({
    goToNextStep,
    addOnceListenerToNode,
    theme,
    setTourField,
    tour,
  });

  const buttonDisabled = !!steps[currentStep].buttonDisabled;

  const nextStepFn = buttonDisabled ? () => {} : () => goToNextStep();

  return (
    <>
      <StartTour />
      <ReactTour
        isOpen={tour.isStarted}
        steps={steps}
        goToStep={currentStep}
        nextStep={nextStepFn}
        onRequestClose={() => endTour(currentStep === steps.length - 1)}
        closeWithMask={false}
        showNavigation={false}
        disableDotsNavigation={true}
        disableKeyboardNavigation={true}
        className={tourWrapper}
        nextButton={<NextButton isDisabled={buttonDisabled} />}
        prevButton={EmptyElement}
        badgeContent={(current, total) => `${current}/${total}`}
        accentColor={theme.palette.primary.dark}
        lastStepNextButton={EmptyElement}
      />
    </>
  );
};
