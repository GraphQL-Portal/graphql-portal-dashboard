import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import IUser from '../../common/interface/user.interface';
import UserService from './user.service';
import TokenService from './token.service';
import { AuthorizationEntity, AuthorizationParam, Roles } from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import { IUserDocument } from '../../data/schema/user.schema';
import ITokens from './interfaces/tokens.interface';

@Resolver('User')
export default class UserResolver {
  public constructor(
    private readonly service: UserService,
    private readonly tokenService: TokenService,
    ) { }

  @Mutation()
  public login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('device') device: string,
  ): Promise<ITokens> {
    return this.service.login(email, password, device);
  }

  @Mutation()
  public register(
    @Args('data') data: IUser,
    @Args('device') device: string,
  ): Promise<ITokens> {
    return this.service.register(data, device);
  }

  @Mutation()
  public refreshTokens(
    @Args('refreshToken') refreshToken: string,
    @Args('device') device: string,
  ): Promise<ITokens> {
    return this.tokenService.refreshTokens(refreshToken, device);
  }

  @Roles([RolesEnum.USER, RolesEnum.ADMIN])
  @Query()
  public getProfile(@AuthorizationEntity() user: IUserDocument): IUserDocument {
    return user;
  }

  @Roles([RolesEnum.ADMIN])
  @Query()
  public getUsers(@AuthorizationParam('_id') userId: string): Promise<IUserDocument[]> {
    return this.service.getUsers(userId);
  }
}
