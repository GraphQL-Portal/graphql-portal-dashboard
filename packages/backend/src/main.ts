import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { config } from 'node-config-ts';
import AppModule from './modules/app.module';
import Header from './common/enum/headers.enum';
import { LoggerService } from './common/logger';

const bootstrap = async (): Promise<void> => {
  const logger = new LoggerService(config);

  const expressApp: Express = express();
  expressApp.disable(Header.X_POWERED_BY);

  const app: INestApplication = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger,
  });
  app.enableCors();

  await app.listen(config.application.port, () => {
    logger.log(`Start listen ${config.application.port}, secret: "${config.application.secret}"`, 'bootstrap');
  });
};

bootstrap();
