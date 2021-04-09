import { ITour } from '../view/Tour/example';

export type TourContextShape = {
  tour: ITour;
  endTour: () => void;
  startTour: () => void;
  setTourField: (key: keyof ITour, value: any) => void;
};
