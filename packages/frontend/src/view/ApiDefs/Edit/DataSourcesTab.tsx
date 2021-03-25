import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { useUpdateDataSources } from '../../../presenter/ApiDefs';
import { PrimaryButton } from '../../../ui';
import { DataSourcesForm } from '../Form';
import { Loading } from '../../Loading';
import { useStyles } from './useStyles';

export const DataSourcesTab: React.FC<Props> = (props) => {
  const {
    onSubmit,
    control,
    options,
    connected,
    onAddSource,
    onRemoveSource,
    loading,
  } = useUpdateDataSources(props);
  const { form } = useStyles();

  if (loading) return <Loading />;

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className={form}>
      <DataSourcesForm
        control={control}
        options={options}
        connected={connected}
        onAddSource={onAddSource}
        onRemoveSource={onRemoveSource}
      />
      <PrimaryButton type="submit">Update Data Sources</PrimaryButton>
    </form>
  );
};
