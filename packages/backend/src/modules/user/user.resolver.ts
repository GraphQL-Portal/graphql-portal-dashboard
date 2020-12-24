import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import IUser from 'src/common/interface/user.interface';
import UserService from './user.service';
import { AuthorizationEntity, Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import { IUserDocument } from 'src/data/schema/user.schema';

@Resolver('User')
export default class UserResolver {
  public constructor(private readonly service: UserService) { }

  @Mutation()
  public login(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    return this.service.login(email, password);
  }

  @Mutation()
  public register(@Args('data') data: IUser): Promise<string> {
    return this.service.register(data);
  }

  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @Query()
  public getProfile(@AuthorizationEntity() user: IUserDocument): IUser {
    return user;
  }
}
