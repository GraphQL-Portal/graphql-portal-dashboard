import React from 'react';

import { useFhirHandler } from '../../../presenter/DataSources';
import { HandlerStep } from '../../../types';

export const FhirHandler: React.FC<HandlerStep> = (props) => {
  const { onSubmit } = useFhirHandler(props);
  // Use onSubmit for form validation and submition
  console.log('onSubmit: ', onSubmit);
  return <div>Form will be here</div>;
};
