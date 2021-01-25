/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    name: string
    application: Application
    db: Db
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
    port: number
    useSwaggerUi: boolean
    graphQL: GraphQL
    logLevel: string
    secret: string
    jwtSecret: string
    salt: string
    defaultAdmin: DefaultAdmin
    metrics: Metrics
    maxmind: Maxmind
  }
  interface Maxmind {
    dbPath: string
    accountId: string
    licenseKey: string
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
