import { DataSource } from '../DataSource';

export type ApiAuth<T> = {
  auth_header_name: string;
  auth_tokens: T;
};

export type ApiDefRateLimit = {
  complexity?: number;
  per?: number;
};

export type AllowIps<T> = {
  allow_ips?: T;
};

export type DenyIps<T> = {
  deny_ips?: T;
};

export type AdditionalApiDefs = string[];

export type AdditionalResolverArgument = {
  [k: string]: string;
};

export type AdditionalResolver = {
  type: string;
  field: string;
  fieldType?: string;
  requiredSelectionSet: string;
  targetSource: string;
  targetMethod: string;
  args?: undefined | AdditionalResolverArgument[] | { [key: string]: string };
};

export type ApiDef = {
  _id: string;
  name: string;
  endpoint: string;
  playground: boolean;
  enabled: boolean;
  authentication?: ApiAuth<string[]>;
  sources: DataSource[];
  schema_polling_interval?: number;
  schema_updates_through_control_api?: boolean;
  enable_ip_filtering?: boolean;
  request_size_limit?: string;
  depth_limit?: number;
  request_complexity_limit?: number;
  rate_limit?: ApiDefRateLimit;
  createdAt: string;
  updatedAt: string;
  mesh?: {
    additionalResolvers: undefined | AdditionalResolver[];
    additionalTypeDefs: undefined | string[];
  };
} & AllowIps<string[]> &
  DenyIps<string[]>;

export type GetApiDefsData = {
  getApiDefs: {
    apiDefs: ApiDef[];
  };
};

export type GetApiDefById = {
  getApiDefById: ApiDef;
};
