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
    postgres: Postgres
  }
  interface Postgres {
    database: string
    port: number
    host: string
    username: string
    password: string
  }
  interface Redis {
    host: string
    port: number
  }
  interface Application {
    env: string
    port: number
    useSwaggerUi: boolean
    graphQL: GraphQL
    logLevel: string
  }
  interface GraphQL {
    playground: boolean
    debug: boolean
  }
  export const config: Config
  export type Config = IConfig
}
