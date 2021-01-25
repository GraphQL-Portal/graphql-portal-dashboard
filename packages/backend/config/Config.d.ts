/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    name: string
    application: Application
    db: Db
    client: Client
  }
  interface Db {
    redis: Redis
    mongodb: Redis
  }
  interface Redis {
    connectionString: string
  }
  interface Application {
    env: string
    host: string
    port: number
    useSwaggerUi: boolean
    graphQL: GraphQL
    logLevel: string
    secret: string
    jwtSecret: string
    salt: string
    defaultAdmin: DefaultAdmin
    metrics: Metrics
    sendgrid: Sendgrid
  }
  interface Client {
    host: string
  }
  interface Sendgrid {
    senderEmail: string
    apiKey: string
    confirmationTemplateId: string
    resetPasswordTemplateId: string
  }
  interface Metrics {
    enabled: boolean
    chunk: number
    delay: number
  }
  interface DefaultAdmin {
    email: string
    password: string
  }
  interface GraphQL {
    playground: boolean
    debug: boolean
  }
  export const config: Config
  export type Config = IConfig
}
