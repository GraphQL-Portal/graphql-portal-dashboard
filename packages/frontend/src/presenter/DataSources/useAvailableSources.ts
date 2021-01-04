import { useForm } from 'react-hook-form';

import { AVAILABLE_SOURCE_SCHEMAS } from './constants';
import { getFilteredList } from './helpers';
import { SearchInput } from './types';

export const useAvailableSources = () => {
  const { control, handleSubmit, reset, watch } = useForm<SearchInput>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = () => {}

  const onReset = () => {
    reset({ search: '' });
  };

  const onKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') onReset();
  }

  const search = watch('search');

  return {
    available: getFilteredList(search, AVAILABLE_SOURCE_SCHEMAS),
    showClearButton: !!search,
    control,
    onSubmit: handleSubmit(onSubmit),
    onKeyDown,
    onReset,
  };
};
