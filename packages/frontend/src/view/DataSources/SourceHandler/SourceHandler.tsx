import React from 'react';

import { HandlerStep, HandlersMapper } from '../../../types';
import { GraphQLHandler } from '../GraphQLHandler';
import { ContentfulHandler } from '../ContentfulHandler';
import { FhirHandler } from '../FhirHandler';
import { TuqlHandler } from '../TuqlHandler';
import { OdataHandler } from '../OdataHandler';
import { Neo4jHandler } from '../Neo4jHandler';
import { MySQLHandler } from '../MySQLHandler';
import { PostGraphileHandler } from '../PostGraphileHandler';
import { ThriftHandler } from '../ThriftHandler';
import { SoapHandler } from '../SoapHandler';
import { GRPCHandler } from '../GRPCHandler';
import { EditorsHandler } from '../EditorsHandler';
import { OpenapiHandler } from '../OpenapiHandler';
import { SalesforceHandler } from '../SalesforceHandler';
import { CrunchbaseHandler } from '../CrunchbaseHandler';
import { TwitterHandler } from '../TwitterHandler';
import { StripeHandler } from '../StripeHandler';
import { FusionCreatorAccountInformationUSHandler } from '../FusionCreatorAccountInformationUSHandler';

// The list of custom handler forms
// Each handler should have React.FC<HandlerStep> type signature
const HANDLERS_MAPPER: HandlersMapper = {
  StripeHandler,
  TwitterHandler,
  CrunchbaseHandler,
  ContentfulHandler,
  SalesforceHandler,
  FusionCreatorAccountInformationUSHandler,
  graphql: GraphQLHandler,
  fhir: FhirHandler,
  tuql: TuqlHandler,
  odata: OdataHandler,
  neo4j: Neo4jHandler,
  mysql: MySQLHandler,
  postgraphile: PostGraphileHandler,
  thrift: ThriftHandler,
  soap: SoapHandler,
  grpc: GRPCHandler,
  openapi: OpenapiHandler,
};

const getHandler = (key: string) => HANDLERS_MAPPER[key] || EditorsHandler;

export const SourceHandler: React.FC<HandlerStep> = (props) => {
  const {
    source: { key },
  } = props;
  const Handler = getHandler(key);
  return <Handler {...props} />;
};
