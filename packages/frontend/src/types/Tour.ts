export type TourContextShape = {
  tour: ITour;
  endTour: (isFinished: boolean) => void;
  startTour: () => void;
  setTourField: (key: keyof ITour, value: any) => void;
};

export interface ITour {
  DATA_CONNECTORS_SEARCH_VALUE: string;
  source: any;
  api: any;
  query: string;
  isStarted: boolean;
}
