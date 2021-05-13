import React from 'react';
import { Input, PrimaryButton } from '../../../ui';
import { useContentfulHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';
import { HandlerCol, HandlerRow } from '../Layout';
import { getError } from '../helpers';

export const ContentfulHandler: React.FC<HandlerStep> = (props) => {
  const { register, errors, onSubmit } = useContentfulHandler(props);
  const hasErrors = getError(errors);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Token"
            required
            name="token"
            error={hasErrors('token')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Your space ID"
            required
            name="space"
            error={hasErrors('space')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="Your environment ID (default to master)"
            name="environment"
            error={hasErrors('environment')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <HandlerRow>
        <HandlerCol>
          <Input
            ref={register}
            label="URL of an existing Contentful endpoint"
            name="endpoint"
            error={hasErrors('endpoint')}
            fullWidth
          />
        </HandlerCol>
      </HandlerRow>
      <PrimaryButton type="submit">Save Handler</PrimaryButton>
    </form>
  );
};
