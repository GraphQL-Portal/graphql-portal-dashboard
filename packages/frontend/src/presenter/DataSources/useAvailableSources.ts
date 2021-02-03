import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { ROUTES, useDataSourceContext } from '../../model/providers';
import { NOOP } from '../../utils';
import { AVAILABLE_DATA_SOURCES } from './constants';
import { getFilteredSources } from './helpers';
import { SearchInput } from './types';

export const useAvailableSources = () => {
  const { setSource } = useDataSourceContext();
  const { push } = useHistory();

  const { control, handleSubmit, reset, watch } = useForm<SearchInput>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = NOOP;

  const onReset = () => reset({ search: '' });

  const onKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') onReset();
  };

  const search = watch('search');

  const onAddClick = (connector: any, key: string) => () => {
    setSource({ connector, key });
    push(ROUTES.DATA_SOURCE_ADD);
  };

  return {
    available: getFilteredSources(search, AVAILABLE_DATA_SOURCES),
    showClearButton: !!search,
    control,
    onSubmit: handleSubmit(onSubmit),
    onKeyDown,
    onReset,
    onAddClick,
  };
};
