import { ElementsTable } from '../../../types';

import { ReactComponent as Fhir } from '../../../icons/Fhir.svg';
import { ReactComponent as Mongoose } from '../../../icons/Mongoose.svg';
import { ReactComponent as JsonSchema } from '../../../icons/JsonSchema.svg';
import { ReactComponent as GraphQL } from '../../../icons/GraphQL.svg';
import { ReactComponent as Grpc } from '../../../icons/Grpc.svg';
import { ReactComponent as MySQL } from '../../../icons/MySQL.svg';
import { ReactComponent as Mesh } from '../../../icons/Mesh.svg';
import { ReactComponent as Neo4j } from '../../../icons/Neo4j.svg';
import { ReactComponent as OData } from '../../../icons/OData.svg';
import { ReactComponent as Openapi } from '../../../icons/Openapi.svg';
import { ReactComponent as PostGraphile } from '../../../icons/PostGraphile.svg';
import { ReactComponent as Thrift } from '../../../icons/Thrift.svg';
import { ReactComponent as Soap } from '../../../icons/Soap.svg';
import { ReactComponent as Contentful } from '../../../icons/Contentful.svg';
import { ReactComponent as Slack } from '../../../icons/Slack.svg';
import { ReactComponent as Portal } from '../../../icons/Portal.svg';
import { ReactComponent as Crunchbase } from '../../../icons/Crunchbase.svg';
import { ReactComponent as Twitter } from '../../../icons/Twitter.svg';
import { ReactComponent as Weatherbit } from '../../../icons/Weatherbit.svg';
import { ReactComponent as Stripe } from '../../../icons/Stripe.svg';
import { ReactComponent as Salesforce } from '../../../icons/Salesforce.svg';

export const ICON_MAPPER: ElementsTable = {
  FhirHandler: Fhir,
  GraphQLHandler: GraphQL,
  GrpcHandler: Grpc,
  JsonSchemaHandler: JsonSchema,
  MySQLHandler: MySQL,
  Neo4jHandler: Neo4j,
  ODataHandler: OData,
  OpenapiHandler: Openapi,
  PostGraphileHandler: PostGraphile,
  SoapHandler: Soap,
  ThriftHandler: Thrift,
  MongooseHandler: Mongoose,
  ContentfulHandler: Contentful,
  SlackHandler: Slack,
  CrunchbaseHandler: Crunchbase,
  TwitterHandler: Twitter,
  WeatherbitHandler: Weatherbit,
  StripeHandler: Stripe,
  SalesforceHandler: Salesforce,
};

export const TYPE_MAPPER: ElementsTable = {
  FhirHandler: Mesh,
  GraphQLHandler: Mesh,
  GrpcHandler: Mesh,
  JsonSchemaHandler: Mesh,
  MongooseHandler: Mesh,
  MySQLHandler: Mesh,
  Neo4jHandler: Mesh,
  ODataHandler: Mesh,
  OpenapiHandler: Mesh,
  PostGraphileHandler: Mesh,
  SoapHandler: Mesh,
  ThriftHandler: Mesh,
  TuqlHandler: Mesh,
  ContentfulHandler: Portal,
  SlackHandler: Portal,
  CrunchbaseHandler: Portal,
  SalesforceHandler: Portal,
  StripeHandler: Portal,
  TwitterHandler: Portal,
  WeatherbitHandler: Portal,
  IPAPIHandler: Portal,
};
