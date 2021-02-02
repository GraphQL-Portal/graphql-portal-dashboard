import { useState } from 'react';
import { useStepper } from './useStepper';
const getStepsCompleted = (limit: number) => Array(limit).map(() => false);

export const useNotLinearStepper = (limit: number) => {
  const [completed, setCompleted] = useState<boolean[]>(
    getStepsCompleted(limit)
  );

  const { step, setStep, nextStep, previousStep } = useStepper(limit);

  const completeStep = (idx: number) =>
    setCompleted((c) => {
      c[idx] = true;
      return c;
    });

  const setCustomStep = (idx: number) => () => setStep(idx);

  return {
    completed,
    completeStep,
    step,
    setStep: setCustomStep,
    nextStep,
    previousStep,
  };
};
