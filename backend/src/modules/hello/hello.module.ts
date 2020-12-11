import { Module } from '@nestjs/common';
import helloProvider from '../../data/model/hello/hello.provider';
import HelloRepository from '../../data/repository/hello.repository';
import HelloController from './hello.controller';
import HelloResolver from './hello.resolver';
import HelloService from './hello.service';

@Module({
  imports: [],
  controllers: [
    HelloController,
  ],
  providers: [
    HelloService,
    HelloResolver,
    HelloRepository,
    helloProvider,
  ],
})
export default class HelloModule {
}
