import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from 'node-config-ts';
import { join } from 'path';
import AccessControlGuard from '../common/guards/access-control-service.guard';
import RolesGuard from '../common/guards/roles.guard';
import { LoggerModule } from '../common/logger';
import AuthenticationMiddleware from '../common/middlewares/auth.middleware';
import { randomString } from '../common/tool';
import ApiDefModule from './api-def/api-def.module';
import GatewayModule from './gateway/gateway.module';
import RedisModule from './redis/redis.module';
import SourceModule from './source/source.module';
import UserModule from './user/user.module';
import MetricModule from './metric/metric.module';

const imports = [
  MongooseModule.forRoot(
    process.env.NODE_ENV === 'test'
      ? config.db.mongodb.connectionString.split('/').slice(0, -1).join('/') +
          `/${randomString()}`
      : config.db.mongodb.connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  ),
  RedisModule.forRoot(config.db.redis.connectionString),
  GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    playground: config.application.graphQL.playground,
    debug: config.application.graphQL.debug,
    typePaths: ['./**/*.gql'],
    context: ({ req }) => ({ req }),
  }),
  LoggerModule.forRoot(config),
  ApiDefModule,
  SourceModule,
  UserModule,
  GatewayModule,
  MetricModule,
];
if (config.application.serveStatic) {
  imports.push(
    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: join(__dirname, '..', '..', '..', 'frontend', 'build'),
    })
  );
}

@Module({
  imports,
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessControlGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export default class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
