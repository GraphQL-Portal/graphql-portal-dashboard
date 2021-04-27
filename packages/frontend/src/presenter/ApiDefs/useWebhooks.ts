import { useFieldArray } from 'react-hook-form';

export const useWebhooks = ({ control }: any) => {
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
