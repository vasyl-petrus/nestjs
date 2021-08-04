import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/user.schema';
import { CreateUserDto, SignInDto, UserDto } from '../users/users.dto';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => UserDto)
  async signIn(@Args('payload') { email, password }: SignInDto) {
    return await this.authService.signIn({ email, password });
  }

  @Mutation(() => User)
  async signUp(@Args('payload') newUser: CreateUserDto) {
    return await this.authService.signUp(newUser);
  }
}
