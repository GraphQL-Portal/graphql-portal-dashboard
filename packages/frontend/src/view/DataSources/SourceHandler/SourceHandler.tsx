import React from 'react';

import { HandlerStep, HandlersMapper } from '../../../types';
import { GraphQLHandler } from '../GraphQLHandler';
import { EditorsHandler } from '../EditorsHandler';

// The list of custom handler forms
// Each handler should have React.FC<HandlerStep> signature
const HANDLERS_MAPPER: HandlersMapper = {
  graphql: GraphQLHandler,
};

const getHandler = (key: string) => HANDLERS_MAPPER[key] || EditorsHandler;

export const SourceHandler: React.FC<HandlerStep> = (props) => {
  const {
    source: { key },
  } = props;
  const Handler = getHandler(key);
  return <Handler {...props} />;
};
