import { Inject, Injectable } from '@nestjs/common';
import HelloModel from '../model/hello/hello.model';

const DEFAULT_COUNTER = 1;

@Injectable()
export default class HelloRepository {
  private helloCounter: Map<string, number> = new Map<string, number>();

  public constructor(@Inject(HelloModel) private readonly helloModel: typeof HelloModel) {
  }

  public async getUsersHelloWorld(name: string): Promise<number> {
    let counter: number | undefined = this.helloCounter.get(name);

    if (counter) {
      this.helloCounter.set(name, counter += 1);

      return counter;
    }

    this.helloCounter.set(name, DEFAULT_COUNTER);

    return DEFAULT_COUNTER;
  }
}
