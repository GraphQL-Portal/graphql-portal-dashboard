import React from 'react';
import { Controller } from 'react-hook-form';

import { AdditionalResolvers as Props } from '../../../types';
import { Col, FormGroup, Input, OutlineButton, Row, Select } from '../../../ui';
import { nameToOptions } from '../../../utils/nameToOptions';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { AdditionalResolverArguments } from './AdditionalResolverArguments';
import { AdditionalResolversSourceMethods } from './AdditionalResolversSourceMethods';
import { useStyles } from './useStyles';

export const AdditionalResolvers: React.FC<Props> = ({
  resolvers,
  onAddResolver,
  onRemoveResolver,
  register,
  errors,
  control,
  sources,
}) => {
  const { formRow } = useStyles();
  const sourceNames = sources?.map(source => source.name).sort() || [];
  const targetSourceOptions = sourceNames.map(nameToOptions);

  return (
    <FormGroup title="Additional Resolvers">
      <AddFieldArrayHeader
        title="Additional Resolver"
        onAddClick={onAddResolver}
      />
      {resolvers.map((resolver: any, idx: number) => {
        return (
          <FormGroup key={`additionalResolver-${idx}`} title="Resolver">
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].type`}
                  label="Type"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.type}
                  defaultValue={
                    resolver.type === 'click' ? undefined : resolver.type
                  }
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].field`}
                  label="Field in selected type"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.field}
                  defaultValue={resolver.field || undefined}
                  fullWidth
                  required
                />
              </Col>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].fieldType`}
                  label="Type of selected field"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.fieldType}
                  defaultValue={resolver.fieldType || undefined}
                  fullWidth
                  required
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Controller
                  as={Select}
                  name={`mesh.additionalResolvers[${idx}].targetSource`}
                  control={control}
                  options={targetSourceOptions || []}
                  label="Target Source"
                  fullWidth
                  defaultValue={resolver.targetSource || ''}
                  required
                />
              </Col>
              <Col xs={6}>
                <AdditionalResolversSourceMethods
                  control={control}
                  name={`mesh.additionalResolvers[${idx}].targetMethod`}
                  sources={sources}
                  defaultValue={resolver.targetMethod}
                  defaultSource={resolver.targetSource}
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].requiredSelectionSet`}
                  label="Selection Set"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]
                      ?.requiredSelectionSet
                  }
                  defaultValue={resolver.requiredSelectionSet || undefined}
                  fullWidth
                />
              </Col>
            </Row>
            <Row spacing={2} className={formRow}>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].returnData`}
                  label="Return Data"
                  error={!!errors?.mesh?.additionalResolvers?.[idx]?.returnData}
                  defaultValue={resolver.returnData || undefined}
                  fullWidth
                />
              </Col>
            </Row>
            <AdditionalResolverArguments
              nestIndex={idx}
              control={control}
              errors={errors}
              register={register}
            />
            <Row spacing={2}>
              <Col xs={6}>
                <OutlineButton onClick={() => onRemoveResolver(idx)}>
                  Remove Resolver
                </OutlineButton>
              </Col>
            </Row>
          </FormGroup>
        );
      })}
    </FormGroup>
  );
};
