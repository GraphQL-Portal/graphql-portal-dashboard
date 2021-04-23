import React from 'react';
import { Controller } from 'react-hook-form';

import { Input, Checkbox, PrimaryButton, H6, FormLabel } from '../../../ui';
import { useGRPCHandler } from '../../../presenter/DataSources';
import { ObjectArray } from '../../Form';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const GRPCHandler: React.FC<HandlerStep> = (props) => {
  const {
    control,
    register,
    errors,
    onSubmit,
    appendMetadataField,
    removeMetadataField,
    metadataFields,
  } = useGRPCHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="URL of an existing gRPC endpoint"
            required
            name="endpoint"
            error={hasErrors('endpoint')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="gRPC Proto file path"
            required
            name="protoFilePath"
            error={hasErrors('protoFilePath')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Service Name"
            name="serviceName"
            error={hasErrors('serviceName')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Package Name"
            name="packageName"
            error={hasErrors('packageName')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Request Timeout"
            name="requestTimeout"
            error={hasErrors('requestTimeout')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <FormLabel
            label="Use HTTPS"
            control={
              <Controller
                name="useHTTPS"
                control={control}
                defaultValue={false}
                render={(props) => <Checkbox {...props} color="primary" />}
              />
            }
          />
        </HandlerCol>
      </HandlerRow>
      <H6> SSL Credentials </H6>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Certicicate Chain"
            name="credentialsSsl.certChain"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Private Key"
            name="credentialsSsl.privateKey"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Root CA"
            name="credentialsSsl.rootCA"
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <ObjectArray
        title="Metadata"
        name="metaData"
        register={register}
        errors={errors}
        fields={metadataFields}
        onAdd={appendMetadataField}
        onRemove={removeMetadataField}
      />
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
