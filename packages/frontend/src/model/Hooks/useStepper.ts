import { useState } from 'react';

export const useStepper = () => {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => setStep((s) => s + 1);

  const previousStep = () => setStep((s) => s - 1);

  return {
    step,
    nextStep,
    previousStep,
  };
};
