import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TransformsStep } from '../../types';
import { AVAILABLE_TRANSFORMS } from './constants';

const createOption = (option: string) => ({ label: option, value: option });
const options = Object.keys(AVAILABLE_TRANSFORMS).map(createOption);

export const useTransforms = ({ state, updateState, step }: TransformsStep) => {
  const [fields, setFields] = useState<string[]>([]);
  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      transform: '',
    },
  });

  const onAddTransform = ({ transform }: { transform: string }) => {
    console.log(transform);
    if (!!transform) {
      setFields((s) => s.concat(transform));
      reset({ transform: '' });
    }
  };

  const onRemoveTransform = (idx: number) => () => {
    setFields((s) => s.slice(0, idx).concat(s.slice(idx + 1)));
  };

  const addTransform = (data: object) => {
    const { transforms } = state;
    updateState({ transforms: transforms.concat(data) }, step);
  };

  return {
    state,
    transforms: options,
    onAddTransform: handleSubmit(onAddTransform),
    onRemoveTransform,
    control,
    fields,
    addTransform,
  };
};
