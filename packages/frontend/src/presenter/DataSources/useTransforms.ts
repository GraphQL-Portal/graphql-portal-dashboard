import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TransformsStep } from '../../types';
import { AVAILABLE_TRANSFORMS } from './constants';

const createOption = (option: string) => ({ label: option, value: option });
const options = Object.keys(AVAILABLE_TRANSFORMS).map(createOption);

const removeFromArray = (arr: any[], idx: number) =>
  arr.slice(0, idx).concat(arr.slice(idx + 1));

export const useTransforms = ({ state, updateState, step }: TransformsStep) => {
  const [fields, setFields] = useState<string[]>([]);
  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      transform: '',
    },
  });

  const onAddTransform = ({ transform }: { transform: string }) => {
    if (!!transform) {
      setFields((s) => s.concat(transform));
      reset({ transform: '' });
    }
  };

  const onRemoveTransform = (idx: number) => () => {
    setFields((s) => removeFromArray(s, idx));
  };

  const addTransform = (data: object) => {
    const { transforms } = state;
    updateState({ transforms: transforms.concat(data) }, step);
  };

  const onRemove = (idx: number) => () => {
    const newState = removeFromArray(state.transforms, idx);
    updateState({ transforms: newState }, step);
  };

  return {
    state,
    transforms: options,
    onAddTransform: handleSubmit(onAddTransform),
    onRemoveTransform,
    control,
    fields,
    addTransform,
    onRemove,
  };
};
