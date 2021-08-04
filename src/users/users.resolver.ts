import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './users.dto';
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
  async createUser(@Args('payload') payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
