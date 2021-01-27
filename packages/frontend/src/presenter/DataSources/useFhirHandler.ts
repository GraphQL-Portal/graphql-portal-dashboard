import { HandlerStep } from '../../types';

export const useFhirHandler = (props: HandlerStep) => {
  return {
    onSubmit: console.log,
  };
};
