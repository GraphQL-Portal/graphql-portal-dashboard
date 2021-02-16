import React from 'react';

import { EditApiTab as Props } from '../../../types';
import { useUpdateDataSources } from '../../../presenter/ApiDefs';
import { WidgetBody, PrimaryButton } from '../../../ui';
import { DataSourcesForm } from '../Form';
import { Loading } from '../../Loading';

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

  if (loading) return <Loading />;
  return (
    <WidgetBody>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <DataSourcesForm
          control={control}
          options={options}
          connected={connected}
          onAddSource={onAddSource}
          onRemoveSource={onRemoveSource}
        />
        <PrimaryButton type="submit">Update Data Sources</PrimaryButton>
      </form>
    </WidgetBody>
  );
};
