export interface IHelloService {
  hello(name: string): Promise<string>;
}
