import { useForm } from 'react-hook-form';

import { AVAILABLE_DATA_SOURCES } from './constants';
import { getFilteredSources } from './helpers';
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
    available: getFilteredSources(search, AVAILABLE_DATA_SOURCES),
    showClearButton: !!search,
    control,
    onSubmit: handleSubmit(onSubmit),
    onKeyDown,
    onReset,
  };
};
