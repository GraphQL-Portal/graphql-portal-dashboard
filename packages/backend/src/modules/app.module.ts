import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'node-config-ts';
import { LoggerModule } from '../common/logger';
import ApiDefModule from './api-def/api-def.module';
import GatewayModule from './gateway/gateway.module';
import RedisModule from './redis/redis.module';
import SourceModule from './source/source.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.mongodb.connectionString, { useNewUrlParser: true, useUnifiedTopology: true }),
    RedisModule.forRoot(config.db.redis.connectionString),
    GraphQLModule.forRoot({
      playground: config.application.graphQL.playground,
      debug: config.application.graphQL.debug,
      typePaths: ['./**/*.gql'],
      context: ({ req }) => ({ req }),
    }),
    LoggerModule.forRoot(config),
    ApiDefModule,
    SourceModule,
    GatewayModule,
  ],
})
export default class AppModule {}
