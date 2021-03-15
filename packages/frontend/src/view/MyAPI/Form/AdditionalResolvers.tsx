import React from 'react';

import { AdditionalResolvers as Props } from '../../../types';
import { FormGroup, Row, Col, Input, OutlineButton } from '../../../ui';
import { AddFieldArrayHeader } from '../../Form/AddFieldArrayHeader';
import { useStyles } from './useStyles';
import { AdditionalResolverArguments } from './AdditionalResolverArguments';

export const AdditionalResolvers: React.FC<Props> = ({
  resolvers,
  onAddResolver,
  onRemoveResolver,
  register,
  errors,
  control,
}) => {
  const { formRow } = useStyles();

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
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].targetSource`}
                  label="Target Source"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]?.targetSource
                  }
                  defaultValue={resolver.targetSource || undefined}
                  fullWidth
                  required
                />
              </Col>
              <Col xs={6}>
                <Input
                  ref={register()}
                  name={`mesh.additionalResolvers[${idx}].targetMethod`}
                  label="Target Method"
                  error={
                    !!errors?.mesh?.additionalResolvers?.[idx]?.targetMethod
                  }
                  defaultValue={resolver.targetMethod || undefined}
                  fullWidth
                  required
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
