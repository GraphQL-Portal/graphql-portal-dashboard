/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
  interface IConfig {
    name: string;
    application: Application;
    gateway: Gateway;
    client: Client;
    db: Db;
  }
  interface Db {
    redis: Redis;
    mongodb: Mongodb;
  }
  interface Mongodb {
    connectionString: string;
  }
  interface Redis {
    connectionString: string;
    clusterNodes: string;
  }
  interface Client {
    host: string;
  }
  interface Gateway {
    secret: string;
  }
  interface Application {
    env: string;
    host: string;
    publicHost: string;
    port: number;
    useSwaggerUi: boolean;
    graphQL: GraphQL;
    serveStatic: boolean;
    logLevel: string;
    cryptoSecret: string;
    jwtSecret: string;
    salt: string;
    defaultAdmin: DefaultAdmin;
    metrics: Metrics;
    sendgrid: Sendgrid;
    maxmind: Maxmind;
  }
  interface Maxmind {
    dbPath: string;
    licenseKey: string;
    accountId: string;
  }
  interface Sendgrid {
    senderEmail: string;
    apiKey: string;
    confirmationTemplateId: string;
    resetPasswordTemplateId: string;
  }
  interface Metrics {
    enabled: boolean;
    chunk: number;
    delay: number;
  }
  interface DefaultAdmin {
    email: string;
    password: string;
  }
  interface GraphQL {
    playground: boolean;
    debug: boolean;
  }
  export const config: Config;
  export type Config = IConfig;
}
