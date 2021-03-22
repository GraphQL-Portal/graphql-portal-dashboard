import { useHotkeys } from 'react-hotkeys-hook';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

import { ROUTES } from '../../model/providers/Router';

const useGoToApis = (history: History) => {
  useHotkeys('a', () => {
    history.push(ROUTES.APIS);
  });
};

const useGoToCreateApi = (history: History) => {
  useHotkeys(
    'a+c',
    () => {
      history.push(ROUTES.API_CREATE);
    },
    { splitKey: '+' }
  );
};

const useGoToSources = (history: History) => {
  useHotkeys('s', () => {
    history.push(ROUTES.DATA_SOURCES);
  });
};

const useGoToDashboard = (history: History) => {
  useHotkeys('d', () => {
    history.push(ROUTES.DASHBOARD);
  });
};

const useCreate = (history: History) => {
  useHotkeys('c', () => {
    if (history.location.pathname === ROUTES.APIS) {
      history.push(ROUTES.API_CREATE);
    }
  });
};

export const useAllHotKeys = () => {
  const history = useHistory();
  useGoToApis(history);
  useGoToCreateApi(history);
  useGoToSources(history);
  useGoToDashboard(history);
  useCreate(history);
};
