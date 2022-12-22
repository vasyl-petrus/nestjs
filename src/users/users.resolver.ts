import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import TokenEntity from 'src/token/token.entity';
import { TokenService } from 'src/token/token.service';
import { CurrentUser } from './current-user.decorator';
import User from './user.entity';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async user(@CurrentUser() user: User) {
    return this.usersService.getById(user.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, payload);
  }

  @ResolveField(() => [TokenEntity])
  async tokens(@Parent() user: User) {
    const { id } = user;
    return await this.tokenService.getUserTokensById(id);
  }
}
