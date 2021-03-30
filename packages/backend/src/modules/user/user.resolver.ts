import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import IUser from '../../common/interface/user.interface';
import UserService from './user.service';
import TokenService from './token.service';
import {
  AuthorizationEntity,
  AuthorizationParam,
  Roles,
} from '../../common/decorators';
import RolesEnum from '../../common/enum/roles.enum';
import { IUserDocument } from '../../data/schema/user.schema';
import ITokens from './interfaces/tokens.interface';
import IUpdateUser from '../../common/interface/update-user.interface';

@Resolver('User')
export default class UserResolver {
  public constructor(
    private readonly service: UserService,
    private readonly tokenService: TokenService
  ) {}

  @Mutation()
  public login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('device') device: string
  ): Promise<ITokens> {
    return this.service.login(email, password, device);
  }

  @Mutation()
  public register(@Args('data') data: IUser): Promise<boolean> {
    return this.service.register({ ...data, role: RolesEnum.USER });
  }

  @Mutation()
  public refreshTokens(
    @Args('refreshToken') refreshToken: string,
    @Args('device') device: string
  ): Promise<ITokens> {
    return this.tokenService.refreshTokens(refreshToken, device);
  }

  @Roles([RolesEnum.USER])
  @Query()
  public getProfile(@AuthorizationEntity() user: IUserDocument): IUserDocument {
    return user;
  }

  @Roles([RolesEnum.ADMIN])
  @Query()
  public getUsers(
    @AuthorizationParam('_id') userId: string
  ): Promise<IUserDocument[]> {
    return this.service.getUsers(userId);
  }

  @Roles([RolesEnum.ADMIN])
  @Mutation()
  public createUser(@Args('data') data: IUser): Promise<boolean> {
    return this.service.register(data);
  }

  @Roles([RolesEnum.ADMIN])
  @Mutation()
  public updateUser(
    @Args('id') id: string,
    @Args('data') data: IUpdateUser
  ): Promise<IUserDocument | null> {
    return this.service.updateUser(id, data);
  }

  @Roles([RolesEnum.ADMIN])
  @Mutation()
  public unblockUser(@Args('id') id: string): Promise<IUserDocument | null> {
    return this.service.unblockUser(id);
  }

  @Roles([RolesEnum.ADMIN])
  @Mutation()
  public blockUser(@Args('id') id: string): Promise<IUserDocument | null> {
    return this.service.blockUser(id);
  }

  @Roles([RolesEnum.ADMIN])
  @Mutation()
  public deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.service.deleteUser(id);
  }

  @Mutation()
  public resetPasswordRequest(@Args('email') email: string): Promise<boolean> {
    return this.service.resetPasswordRequest(email);
  }

  @Mutation()
  public changePassword(
    @AuthorizationEntity() { email }: IUserDocument,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string
  ): Promise<boolean> {
    return this.service.changePassword(email, oldPassword, newPassword);
  }

  @Mutation()
  public resetPassword(
    @Args('email') email: string,
    @Args('code') code: string,
    @Args('password') password: string
  ): Promise<boolean> {
    return this.service.resetPassword(email, code, password);
  }
}
