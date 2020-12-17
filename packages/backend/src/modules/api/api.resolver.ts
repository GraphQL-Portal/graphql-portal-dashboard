import IApi from '../../common/interface/api.interface';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import ApiService from './api.service';

@Resolver('Api')
export default class ApiResolver {
  public constructor(private readonly apiService: ApiService) {}

  @Query()
  public getApis(): Promise<IApi[]> {
    return this.apiService.findAll();
  }

  @Mutation()
  public createApi(
    @Args('name') name: string,
    @Args('endpoint') endpoint: string,
    @Args('sources') sources: string[]
  ): Promise<IApi> {
    return this.apiService.create({ name, endpoint, sources });
  }

  @Mutation()
  public deleteApi(@Args('name') name: string): Promise<number> {
    return this.apiService.delete(name);
  }
}
