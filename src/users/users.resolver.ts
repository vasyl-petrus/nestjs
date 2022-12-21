import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from './current-user.decorator';
import User from './user.entity';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';
@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getById(id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, payload);
  }
}
