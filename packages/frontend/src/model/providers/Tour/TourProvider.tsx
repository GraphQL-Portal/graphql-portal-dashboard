import React, { useContext, useState, createContext } from 'react';
import { TourContextShape } from '../../../types';
import { ITour, source, api, query } from '../../../view/Tour/example';

const defaultValues = {
  DATA_CONNECTORS_SEARCH_VALUE: '',
  source,
  api,
  query,
  isStarted: true,
};

const TourContext = createContext<null | TourContextShape>(null);
export const useTourContext = () => useContext(TourContext)!;
const { Provider } = TourContext;

export const TourProvider: React.FC = ({ children }) => {
  const [tour, setTour] = useState<ITour>(defaultValues);

  const setTourField = (key: keyof ITour, value: any) =>
    setTour((prev) => ({ ...prev, [key]: value }));
  const endTour = () => setTour({ ...defaultValues, isStarted: false });
  const startTour = () => setTour({ ...defaultValues, isStarted: true });

  return (
    <Provider value={{ tour, endTour, startTour, setTourField }}>
      {children}
    </Provider>
  );
};
