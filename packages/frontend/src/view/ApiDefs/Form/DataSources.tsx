import React from 'react';
import { Controller } from 'react-hook-form';

import { FormGroup, Row, Col, Select, OutlineButton } from '../../../ui';
import { ApiDataSourcesForm as Props } from '../../../types';
import { ConnectedList } from '../../DataSources/DataSources/ConnectedList';
import { useStyles } from './useStyles';
import { selectors } from '../../Tour';

export const DataSourcesForm: React.FC<Props> = ({
  control,
  options,
  onAddSource,
  connected,
  onRemoveSource,
  disableSelect,
}) => {
  const { addButton } = useStyles();
  return (
    <FormGroup title="Data Sources">
      <Row spacing={2}>
        <Col xs={6}>
          <Controller
            as={Select}
            name="source"
            control={control}
            options={options}
            disabled={disableSelect}
            label="Select data-source to add"
            fullWidth
            data-intro={selectors.MY_APIS_CREATE_FORM_SELECT_DATA_SOURCE}
          />
        </Col>
        <Col xs={6}>
          <OutlineButton
            data-intro={selectors.MY_APIS_CREATE_FORM_ADD_DATA_SOURCE_BUTTON}
            onClick={onAddSource}
            className={addButton}
          >
            Add Data Source
          </OutlineButton>
        </Col>
      </Row>
      {connected.length > 0 && (
        <ConnectedList onDelete={onRemoveSource} sources={connected} />
      )}
    </FormGroup>
  );
};
