import { Theme } from '@material-ui/core';
import { ReactourStep } from 'reactour';

export type TourContextShape = {
  tour: ITour;
  endTour: (isFinished: boolean) => void;
  startTour: () => void;
  setTourField: SetTourField;
};

export interface ITour {
  DATA_CONNECTORS_SEARCH_VALUE: string;
  source: any;
  api: any;
  query: string;
  isStarted: boolean;
}

export type AddOnceListenerToNode = (
  domNode: Element | undefined,
  func: (node: Element | undefined, event?: any) => void
) => void;

export type WaitUntilNextStepElementAppears = (
  selector: string | undefined,
  callback: () => void
) => void;

export type SetTourField = (key: keyof ITour, value: any) => void;

export type GoToNextStep = (selector?: string) => void;

export type GetSteps = (data: {
  tour: ITour;
  addOnceListenerToNode: AddOnceListenerToNode;
  theme: Theme;
  setTourField: SetTourField;
  goToNextStep: GoToNextStep;
}) => Array<ReactourStep & { buttonDisabled?: boolean }>;
