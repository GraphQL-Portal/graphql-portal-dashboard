import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { ROUTES, useDataSourceContext } from '../../model/providers';
import { NOOP } from '../../utils';
import { SearchAvailableForm } from '../../types';
import { AVAILABLE_HANDLERS } from './constants';
import { getFilteredSources } from './helpers';

export const useAvailableSources = () => {
  const { setSource } = useDataSourceContext();
  const { push } = useHistory();

  const { control, handleSubmit, reset, watch } = useForm<SearchAvailableForm>({
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
    available: getFilteredSources(search, AVAILABLE_HANDLERS),
    showClearButton: !!search,
    control,
    onSubmit: handleSubmit(onSubmit),
    onKeyDown,
    onReset,
    onAddClick,
  };
};
