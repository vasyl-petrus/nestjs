import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.schema';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';
@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async user(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.usersService.getById(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdateUserDto,
  ) {
    return this.usersService.update(user._id, payload);
  }
}
