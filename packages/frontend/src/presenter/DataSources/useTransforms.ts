import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TransformsStep } from '../../types';
import { AVAILABLE_TRANSFORMS } from './constants';
import { formatTransformLabel } from './helpers/formatTransformLabel';

const createOption = (option: string) => ({
  label: formatTransformLabel(option),
  value: option,
});
const options = Object.keys(AVAILABLE_TRANSFORMS).map(createOption);

const removeFromArray = (arr: any[], idx: number) =>
  arr.slice(0, idx).concat(arr.slice(idx + 1));

const insertToArray = (arr: any[], idx: number, member: any) =>
  arr.slice(0, idx).concat(member).concat(arr.slice(idx));

export const useTransforms = ({ state, updateState, step }: TransformsStep) => {
  const [edited, setEdited] = useState<{
    [key: string]: { [key: string]: any };
  }>({});
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

  const onEdit = (idx: number, transform: any) => () =>
    setEdited((s) => {
      return Object.assign({}, s, { [idx]: transform });
    });

  const onCancelEdit = (idx: string) => () =>
    setEdited((s) => {
      const newState = Object.assign({}, s);
      delete newState[idx];
      return newState;
    });

  const onUpdateTransform = (idx: number) => (transform: any) => {
    const { transforms } = state;
    const newState = removeFromArray(transforms, idx);
    updateState(
      {
        transforms: insertToArray(newState, idx, transform),
      },
      step
    );
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
    onEdit,
    edited,
    onCancelEdit,
    onUpdateTransform,
  };
};
