import { AVAILABLE_SOURCE_SCHEMAS } from './constants';

export const useDataSources = () => {
  return {
    available: AVAILABLE_SOURCE_SCHEMAS,
  };
}
