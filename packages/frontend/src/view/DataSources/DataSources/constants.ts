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
import { ReactComponent as Fedex } from '../../../icons/Fedex.svg';
import { ReactComponent as Crunchbase } from '../../../icons/Crunchbase.svg';
import { ReactComponent as Twitter } from '../../../icons/Twitter.svg';
import { ReactComponent as Weatherbit } from '../../../icons/Weatherbit.svg';
import { ReactComponent as Stripe } from '../../../icons/Stripe.svg';
import { ReactComponent as Salesforce } from '../../../icons/Salesforce.svg';

export const ICON_MAPPER: ElementsTable = {
  Fhir: Fhir,
  GraphQL: GraphQL,
  Grpc: Grpc,
  JsonSchema: JsonSchema,
  MySQL: MySQL,
  Neo4j: Neo4j,
  OData: OData,
  OpenAPI: Openapi,
  PostGraphile: PostGraphile,
  Soap: Soap,
  Thrift: Thrift,
  Mongoose: Mongoose,
  Contentful: Contentful,
  Slack: Slack,
  Fedex: Fedex,
  Crunchbase: Crunchbase,
  Twitter: Twitter,
  Weatherbit: Weatherbit,
  Stripe: Stripe,
  Salesforce: Salesforce,
};

export const TYPE_MAPPER: ElementsTable = {
  Fhir: Mesh,
  GraphQL: Mesh,
  Grpc: Mesh,
  JsonSchema: Mesh,
  Mongoose: Mesh,
  MySQL: Mesh,
  Neo4j: Mesh,
  OData: Mesh,
  OpenAPI: Mesh,
  PostGraphile: Mesh,
  Soap: Mesh,
  Thrift: Mesh,
  Tuql: Mesh,
  Contentful: Portal,
  Slack: Portal,
  Crunchbase: Portal,
  Fedex: Portal,
  Salesforce: Portal,
  Stripe: Portal,
  Twitter: Portal,
  Weatherbit: Portal,
};
