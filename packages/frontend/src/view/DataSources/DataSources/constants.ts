import { ElementsTable } from '../../../types';

import { ReactComponent as JsonSchema } from '../../../icons/JsonSchema.svg';
import { ReactComponent as GraphQL } from '../../../icons/GraphQL.svg';
import { ReactComponent as Grpc } from '../../../icons/Grpc.svg';
import { ReactComponent as MySQL } from '../../../icons/MySQL.svg';
import { ReactComponent as Mesh } from '../../../icons/Mesh.svg';
import { ReactComponent as Neo4j } from '../../../icons/Neo4j.svg';
import { ReactComponent as OData } from '../../../icons/OData.svg';
import { ReactComponent as Openapi } from '../../../icons/Openapi.svg';
import { ReactComponent as PostGraphile } from '../../../icons/PostGraphile.svg';
import { ReactComponent as Contentful } from '../../../icons/Contentful.svg';
import { ReactComponent as Slack } from '../../../icons/Slack.svg';
import { ReactComponent as Portal } from '../../../icons/Portal.svg';

export const ICON_MAPPER: ElementsTable = {
  GraphQL: GraphQL,
  Grpc: Grpc,
  JsonSchema: JsonSchema,
  MySQL: MySQL,
  Neo4j: Neo4j,
  OData: OData,
  Openapi: Openapi,
  PostGraphile: PostGraphile,
  Contentful: Contentful,
  Slack: Slack,
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
  Openapi: Mesh,
  PostGraphile: Mesh,
  Soap: Mesh,
  Thrift: Mesh,
  Tuql: Mesh,
  Contentful: Portal,
  Slack: Portal,
};
