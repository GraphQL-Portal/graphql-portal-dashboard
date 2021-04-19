import React, { useContext, useState, createContext } from 'react';
import { TourContextShape, ITour } from '../../../types';
import { source, api, query } from '../../../view/Tour/example';
import { useDeleteApiDefByName } from '../../ApiDefs/commands';
import { useDeleteSourceByName } from '../../DataSources/commands';
import { storeTour } from './helpers';

const defaultValues = {
  DATA_CONNECTORS_SEARCH_VALUE: '',
  source,
  api,
  query,
  isStarted: false,
};

const TourContext = createContext<null | TourContextShape>(null);
export const useTourContext = () => useContext(TourContext)!;
const { Provider } = TourContext;

export const TourProvider: React.FC = ({ children }) => {
  const [tour, setTour] = useState<ITour>(defaultValues);

  const [onDeleteApiDef] = useDeleteApiDefByName();
  const { deleteSource } = useDeleteSourceByName();

  const setTourField = (key: keyof ITour, value: any) =>
    setTour((prev) => ({ ...prev, [key]: value }));

  const endTour = (isFinished: boolean) => {
    if (isFinished) storeTour(true);
    setTour(defaultValues);
  };

  const dontShowTourAgain = () => endTour(true);

  const startTour = () => {
    onDeleteApiDef({
      variables: {
        name: tour?.api?.name || '',
      },
    }).then(() => {
      deleteSource({
        variables: {
          name: tour?.source?.state?.name || '',
        },
      });
    });
    setTour({ ...defaultValues, isStarted: true });
  };

  return (
    <Provider
      value={{ tour, endTour, startTour, setTourField, dontShowTourAgain }}
    >
      {children}
    </Provider>
  );
};
