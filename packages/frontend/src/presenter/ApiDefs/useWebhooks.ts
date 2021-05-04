import { useFieldArray } from 'react-hook-form';
import { ControlType } from '../../types';

export const useWebhooks = ({ control }: ControlType) => {
  const { fields: hooks, append: addHook, remove: removeHook } = useFieldArray({
    control,
    name: 'webhooks',
  });

  return {
    hooks,
    addHook,
    removeHook,
  };
};
