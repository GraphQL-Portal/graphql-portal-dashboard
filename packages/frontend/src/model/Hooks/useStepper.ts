import { useState } from 'react';

const MIN = 0;
const STEP = 1;

export const useStepper = (limit: number) => {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => setStep((s) => (s + STEP <= limit ? s + STEP : s));

  const previousStep = () => setStep((s) => (s - STEP > MIN ? s - STEP : MIN));

  return {
    step,
    nextStep,
    previousStep,
    setStep,
  };
};
