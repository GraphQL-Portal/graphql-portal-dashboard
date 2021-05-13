import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import {
  ROUTES,
  useDataSourceContext,
  useTourContext,
} from '../../model/providers';
import { NOOP } from '../../utils';
import { SearchAvailableForm } from '../../types';
import { AVAILABLE_HANDLERS } from './constants';
import { getFilteredSources } from './helpers';
import { useEffect } from 'react';

export const useAvailableSources = () => {
  const { setSource } = useDataSourceContext();
  const { tour } = useTourContext();
  const { push } = useHistory();

  const { register, handleSubmit, reset, watch } = useForm<SearchAvailableForm>(
    {
      reValidateMode: 'onSubmit',
      defaultValues: {
        search: '',
      },
    }
  );

  const onSubmit = NOOP;

  useEffect(() => {
    reset({ search: tour.DATA_CONNECTORS_SEARCH_VALUE });
  }, [tour.DATA_CONNECTORS_SEARCH_VALUE]);

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
    available: getFilteredSources(search, AVAILABLE_HANDLERS),
    showClearButton: !!search,
    register,
    onSubmit: handleSubmit(onSubmit),
    onKeyDown,
    onReset,
    onAddClick,
  };
};
