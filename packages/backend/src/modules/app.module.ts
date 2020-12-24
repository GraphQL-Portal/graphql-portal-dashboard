import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'node-config-ts';
import AuthenticationMiddleware from 'src/common/middlewares/auth.middleware';
import { LoggerModule } from '../common/logger';
import ApiDefModule from './api-def/api-def.module';
import AuthModule from './auth/auth.module';
import GatewayModule from './gateway/gateway.module';
import RedisModule from './redis/redis.module';
import SourceModule from './source/source.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.mongodb.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    RedisModule.forRoot(config.db.redis.connectionString),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      playground: config.application.graphQL.playground,
      debug: config.application.graphQL.debug,
      typePaths: ['./**/*.gql'],
      context: ({ req, res }) => ({ req, res }),
    }),
    LoggerModule.forRoot(config),
    ApiDefModule,
    SourceModule,
    AuthModule,
    GatewayModule,
  ]
})
export default class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply(AuthenticationMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
