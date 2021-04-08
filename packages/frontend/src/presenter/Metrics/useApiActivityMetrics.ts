import { useParams } from 'react-router';
import { useApiMetrics } from './useApiMetrics';

export const useApiActivityMetrics = () => {
  const { id: apiDef } = useParams<{ id: string }>();
  return useApiMetrics(apiDef);
};
