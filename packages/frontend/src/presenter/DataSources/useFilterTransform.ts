import { useFieldArray, useForm } from 'react-hook-form';
import { vestResolver } from '@hookform/resolvers/vest';
import vest, { test, enforce } from 'vest';
import { arrayStringFromObjectArray, arrayToFieldArray } from './helpers';
import { FilterTransformForm, UseFilterTransformHook } from '../../types';
import { useFormErrors } from '../../model/Hooks';

const FILTER_DEFAULT_VALUE = {
  mode: 'bare',
  filters: undefined,
};

const suite = vest.create(
  'filter_transform',
  ({ filters }: FilterTransformForm) => {
    test('filters', 'Filters is required', () => {
      enforce(filters).isNotEmpty();
    });
  }
);

export const useFilterTransform: UseFilterTransformHook = ({
  type,
  onCancel,
  onSuccess,
  value,
}: any) => {
  const { mode, filters } = value || {};
  const defaultValues = Object.assign({}, FILTER_DEFAULT_VALUE, mode, {
    filters: arrayToFieldArray(filters || []),
  });

  const {
    register,
    handleSubmit,
    errors,
    control,
  } = useForm<FilterTransformForm>({
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues,
    resolver: vestResolver(suite),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'filters',
  });

  useFormErrors(errors);

  const onSubmit = ({ filters, mode }: FilterTransformForm) => {
    onCancel();
    onSuccess({
      [type]: {
        mode,
        filters: arrayStringFromObjectArray(filters),
      },
    });
  };

  const onAddFilter = () => append({ value: '' });

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    handleSubmit,
    errors,
    control,
    filters: fields,
    onAddFilter,
    onRemoveFilter: remove,
  };
};
