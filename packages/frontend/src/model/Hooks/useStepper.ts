import { useState } from 'react';

const MIN = 0;
const STEP = 1;

export const useStepper = (limit: number) => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((s) => (s + STEP < limit ? s + MIN : s));

  const previousStep = () => setStep((s) => (s - STEP > MIN ? s - STEP : MIN));

  return {
    step,
    nextStep,
    previousStep,
  };
};
