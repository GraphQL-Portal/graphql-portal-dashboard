import {Inject, Injectable} from '@nestjs/common';
import {LoggerService} from '../../common/logger';
import HelloRepository from '../../data/repository/hello.repository';
import {IHelloService} from './interface/hello.service.interface';

@Injectable()
export default class HelloService implements IHelloService {
    public constructor(
        @Inject(HelloRepository) private readonly helloRepository: HelloRepository,
        private readonly loggerService: LoggerService,
    ) {
    }

    public async hello(name: string): Promise<string> {
        const counter: number = await this.helloRepository.getUsersHelloWorld(name);

        this.loggerService.log(`User name: ${name} requested hello route ${counter} times.`, this.constructor.name);

        return `Hello, ${name}! Your counter: ${counter}`;
    }
}
